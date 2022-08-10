import { Storage } from '@capacitor/storage';
import { Capacitor } from "@capacitor/core";

const appname = "criollom";
const version = "2.0";
const versionKey = "criollom_version";

const storageWrite = (key, value) => { // Guardar datos en localStorage    
    const v = JSON.stringify(value);
    if(Capacitor.isNativePlatform())
        Storage.set({key, value:v});
    else{
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
                console.log("Error al guardar datos");
                console.log(e);
            }
        }else{
            //console.log("set: Fallback a localStorage");
            localStorage.setItem(key, v);
        }
    }
};

const storageRead = key => {    
    if(Capacitor.isNativePlatform())
        Storage.get({key}).then(result => {
            return JSON.parse(result.value);
        });
    else{
        if(window.avt){
            const userData = window.avt.generalData.getUserData();
            const req = {ids:[userData.id], keys:[key]};
            window.avt.storage.user.get(req)
            .then(result => {                                    
                if(result){
                    if(result.info?.objects[userData.id]){
                        if(result.info.objects[userData.id][key]){
                            const data = result.info.objects[userData.id][key].data;
                            return JSON.parse(data);
                        }
                    }
                }
            });
        }else{            
            const content = localStorage.getItem(key);
            if(content){
                return JSON.parse(content);
            }
        }
    }
};

export const saveData = (key, value) => {
    return storageWrite(`${appname}_${version}_${key}`, value);
};

export const getData = key => {
    return storageRead(`${appname}_${version}_${key}`);
};

// Check data version
const dataVersion = storageRead(versionKey);
if(version !== dataVersion){
    if(Capacitor.isNativePlatform()){
        Storage.clear();
    }else{
        localStorage.clear();
    }
    storageWrite(versionKey, version);
}