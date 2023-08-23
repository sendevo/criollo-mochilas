import { Capacitor } from "@capacitor/core";
import { Preferences } from '@capacitor/preferences';

const appname = "criollom";
const version = "2.0";
const versionKey = "criollom_version";

const storageWrite = (key, value) => { // Guardar datos en localStorage    
    const v = JSON.stringify(value);
    if(window.avt){
        try{
            const userData = window.avt.generalData.getUserData();
            const data = {
                id: userData.id,
                key: key,
                value: {data: v},
                overwrite: true
            };                    
            window.avt.storage.user.put(data);
        }catch(e){
            //console.log("Error al guardar datos");
            //console.log(e);
            Function.prototype();
        }
    }
    //console.log("set: Fallback a localStorage");
    localStorage.setItem(key, v);
};

const storageRead = key => {       
    const content = localStorage.getItem(key);
    if(content){
        return JSON.parse(content);
    }
};

export const saveData = (key, value) => {
    return storageWrite(`${appname}_${version}_${key}`, value);
};

export const getData = key => {
    return storageRead(`${appname}_${version}_${key}`);
};

const checkVersion = () => {// Check data version
    const dataVersion = storageRead(versionKey);
    if(version !== dataVersion){
        if(Capacitor.isNativePlatform()){
            Preferences.clear();
        }else{
            localStorage.clear();
        }
        storageWrite(versionKey, version);
    }
};

// El metodo getData es async, por lo que no se puede usar get() aqui
// A modo de parche, se copia los datos de avt.storage a localStorage al inicio
if(window.avt){
    const avtTolocalStorage = k => {
        const key = `${appname}_${version}_${k}`;
        return new Promise((resolve, reject) => {
            const userData = window.avt.generalData.getUserData();
            const req = {ids:[userData.id], keys:[key]};
            window.avt.storage.user.get(req)
            .then(result => {   
                let success = false;
                if(result){
                    if(result.info?.objects[userData.id]){
                        if(result.info.objects[userData.id][key]){
                            const data = result.info.objects[userData.id][key].data;
                            localStorage.setItem(key, data);
                            success = true;
                        }
                    }
                }
                if(!success)
                    reject("AVT Read Err. (wrong format)");
            })
            .catch(reject);
        });
    };
    Promise.all([
        avtTolocalStorage(versionKey),         
        avtTolocalStorage("reports")
    ]).then(() => {
        checkVersion();
    });
}else{
    checkVersion();
}