import * as pdfFonts from "pdfmake/build/vfs_fonts.js";
import pdfMake from 'pdfmake';
import moment from 'moment';
import Toast from '../../components/Toast';
import { formatNumber } from "../../utils";
import { presentationUnits } from "../API";
import { Capacitor } from '@capacitor/core';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { FileSharer } from '@byteowls/capacitor-filesharer';
import { logoCriollo, membreteCriollo } from '../../assets/base64';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const styles = { // Definicion de estilos de las secciones del reporte
    header: {
        fontSize: 18,
        bold: true,
        alignment: "center",
        margin: [0, 0, 0, 15] //[left, top, right, bottom]
    },
    subheader: {
        fontSize: 16,
        bold: true,
        margin: [0, 10, 0, 10]
    },
    section: {
        fontSize: 14,
        bold: true,
        margin: [0, 10, 0, 10]
    },
    subsection: {
        fontSize: 14,
        bold: false,
        margin: [0, 10, 0, 10]
    },
    text: {
        fontSize: 12,
        bold: false,
        margin: [0, 3, 0, 3]
    },
    tableHeader: {
        bold: true,
        fontSize: 13,
        color: 'black'
    }
};

const reportHeader = { // Lo que aparece en cada pagina
    image: logoCriollo, // Logo base 64
    width: 50,
    margin: [10,10,10,10],
    alignment: "right"
};

const reportFooter = {
    image: membreteCriollo, // Membrete
    width: 350,
    margin: [15,10,10,10],
    alignment: "left"
};


const PDFExport = (report, share) => {
    const reportContent = [ // Composicion de todo el documento
        {
            text: "Criollo Mochilas",
            style: "header"
        },
        {
            text: "Reporte de la labor",
            style: "subheader"
        },
        {
            text: "   Nombre: " + report.name,
            style: "subheader"
        },
        {
            text: "   Fecha y hora: " + moment(report.timestamp).format("DD/MM/YYYY HH:mm"),
            style: "subheader"
        }
    ];

    if(report.completed.params) {
        reportContent.push({
            text: "Parámetros de aplicación",
            style: "section"
        });
        reportContent.push({
            layout: 'lightHorizontalLines',
            table: {
                headerRows: 0,
                widths: ['*', '*'],
                body: [
                    [{
                        text: "Distancia recorrida:",
                        style: "tableHeader"
                    }, formatNumber(report.params.d)+" m"],
                    [{
                        text: "Ancho de banda:",
                        style: "tableHeader"
                    }, formatNumber(report.params.w) + " m"],
                    [{
                        text: "Volumen inicial:",
                        style: "tableHeader"
                    }, formatNumber(report.params.Vi) + " l"],
                    [{
                        text: "Volumen recolectado:",
                        style: "tableHeader"
                    }, formatNumber(report.params.Vf) + " l (Gasto: "+formatNumber(report.params.Vg)+" l)"],
                    [{
                        text: "Volumen de aplicación:",
                        style: "tableHeader"
                    }, formatNumber(report.params.Va) + " l/ha"],
                ]
            },
            margin: [0, 0, 0, 15]
        });
    }

    if (report.completed.supplies) {

        reportContent.push({
            text: "Parámetros de mezcla",
            style: "section"
        });
        reportContent.push({
            text: "Lote: " + report.supplies.lotName,
            style: "text"
        });
        reportContent.push({
            text: "Superficie: " + formatNumber(report.supplies.workArea) + " ha",
            style: "text"
        });
        reportContent.push({
            text: "Volumen pulverizado: " + formatNumber(report.supplies.workVolume) + " l/ha",
            style: "text"
        });
        reportContent.push({
            text: "Capacidad tanque: " + formatNumber(report.supplies.capacity, 0) + " litros",
            style: "text"
        });
        reportContent.push({
            text: "Cantidad de cargas: " + report.supplies.loadsText,
            style: "text"
        });

        reportContent.push({
            text: "Prescripción",
            style: "subsection"
        });

        const rows1 = [
            [
                {
                    text: "Producto",
                    style: "tableHeader"
                },
                {
                    text: "Dosis",
                    style: "tableHeader"
                }

            ]
        ];

        report.supplies.pr.forEach(prod => {            
            rows1.push( [
                prod.name,
                formatNumber(prod.dose, 2) + " " + presentationUnits[prod.presentation]
            ]);
        });

        reportContent.push({
            layout: 'lightHorizontalLines',
            table: {
                headerRows: 1,
                widths: ['*', '*'],
                body: rows1
            },
            margin: [0, 0, 0, 15]
        });

        reportContent.push({
            text: "Insumos",
            style: "subsection"
        });

        const rows2 = report.supplies.loadBalancingEnabled ? 
        [
            [
                {
                    text: "Producto",
                    style: "tableHeader"
                },
                {
                    text: "Carga",
                    style: "tableHeader"
                },
                {
                    text: "Total insumos",
                    style: "tableHeader"
                }

            ]
        ] : [
            [
                {
                    text: "Producto",
                    style: "tableHeader"
                },
                {
                    text: "Carga completa",
                    style: "tableHeader"
                },
                {
                    text: "Fracción de carga",
                    style: "tableHeader"
                },
                {
                    text: "Total insumos",
                    style: "tableHeader"
                }

            ]
        ];

        report.supplies.pr.forEach(prod => {
            const unit = prod.presentation === 0 || prod.presentation === 2 ? " l" : " kg";
            rows2.push( report.supplies.loadBalancingEnabled ? [
                prod.name,
                formatNumber(prod.ceq, 1) + unit,
                formatNumber(prod.total, 1) + unit
            ]:[
                prod.name,
                formatNumber(prod.cpp, 1) + unit,
                formatNumber(prod.cfc, 1) + unit,
                formatNumber(prod.total, 1) + unit
            ]);
        });

        reportContent.push({
            layout: 'lightHorizontalLines',
            table: {
                headerRows: 1,
                widths: report.supplies.loadBalancingEnabled ? ['*', '*', '*'] : ['*', '*', '*', '*'],
                body: rows2
            },
            margin: [0, 0, 0, 15]
        });

        if(report.supplies.comments){
            if(report.supplies.comments.length > 0){
                reportContent.push({
                    text: "Observaciones:",
                    style: "section"
                });
                reportContent.push({
                    text: report.supplies.comments,
                    style: "text"
                });
            }
        }
    }

    const document = { // Documento
        header: reportHeader,
        footer: reportFooter,
        content: reportContent,
        styles: styles,
        pageMargins: [ 40, 80, 40, 60 ]
    };

    // Generar y guardar
    const fileName = "Reporte Criollo "+moment(report.timestamp).format("DD-MM-YYYY HH-mm")+".pdf";    
    const pdfFile = pdfMake.createPdf(document);

    if(Capacitor.isNativePlatform()){
        
        const shareFile = (fileName, data) => {
            FileSharer.share({
                filename: fileName,
                base64Data: data,
                contentType: "application/pdf",
            }).then(() => {
                Toast("success", "Reporte compartido", 2000, "center");
            }).catch(error => {
                console.error("Error FileSharer: "+error.message);
                Toast("error", "Reporte no compartido", 2000, "center");
            });
        };

        const saveFile = fileName => {            
            pdfFile.getBase64(base64pdf => {                                
                Filesystem.writeFile({
                    data: base64pdf,
                    path: fileName,
                    directory: Directory.Documents,                    
                    replace: true
                }).then(() => {                    
                    if(share){
                        Toast("info", "Generando reporte...", 2000, "center");
                        shareFile(fileName, base64pdf);
                    }else 
                        Toast("success", "Reporte guardado en Documentos: "+fileName, 2000, "center");                    
                }).catch(err => {
                    console.log(err);
                    Toast("error", "Error al guardar el reporte", 2000, "center");
                });
            });
        };

        Filesystem.checkPermissions().then(permissions => {                        
            if(permissions.publicStorage === "granted"){ 
                saveFile(fileName);
            }else{
                Toast("info", "Permisos de almacenamiento no otorgados", 2000, "center");
                Filesystem.requestPermissions().then(res => {
                    console.log(res);
                    saveFile(fileName);
                }).catch(() => {
                    console.log("No se pudo guardar el reporte");
                });
            }
        });
    }else{
        pdfFile.download(fileName);
    }
};

export default PDFExport;