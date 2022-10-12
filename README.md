# Criollo Mochilas 2.0

Criollo mochilas es una App para dispositivos móviles que brinda las herramientas necesarias para realizar la calibración de mochilas pulverizadoras. Permite calcular volumen pulverizado en l/ha y las cantidades de productos necesarias en función de las dosis prescriptas. La información que genera puede almacenarse en reportes que pueden ser compartidos por WhatsApp, mail o redes sociales.

### [Disponible en Google Play!](https://play.google.com/store/apps/details?id=com.inta.criollom)  

![criollo-mochilas](doc/promocion-criollo-mochilas.jpg)

### Versión 2.0 [2] (Migración nativo -> híbrido)
  - Implementación con Vite (Rollup): ReactJS (v18) + Framework7 + Capacitor.
  - Nueva presentación. Mejoras en control y validación de campos.  
  - El almacenamiento de los datos se realiza en Storage de Capacitor en el caso nativo, en avt.storage en el caso de la extensión Auravant o en localStorage en el caso web.  


## Instalación y despliegue

Descargar código fuente e instalar dependencias
```bash
$ git clone https://github.com/sendevo/criollo-mochilas  
$ cd criollo-mochilas  
$ npm install  
```

Correr versión web para debug (localhost:3000)
```bash
$ npm run dev
```

Compilar versión web optimizada
```bash
$ npm run build
```

### Compilar apk (android) por primera vez:
1.- Instalar android studio y ubicar carpeta de instalación.  

2.- Agregar plataforma con capacitor y generar proyecto android-studio:  

```bash
$ export CAPACITOR_ANDROID_STUDIO_PATH="..../android-studio/bin/studio.sh"
$ export PATH=~/.npm-global/bin:$PATH  
$ npx cap add android
$ npm run build && npx cap sync
```

3.- Indicar el SDK level en app/variables.gradle
```
minSdkVersion = 21
compileSdkVersion = 30
targetSdkVersion = 31
```

4.- Agregar permisos en android/app/src/main/AndroidManifest.xml:  

```xml
...
<aplication>
  ...
  android:requestLegacyExternalStorage="true"
  ...
  <activity
    ...
    android:exported="true"
    ...
    >
  </activity>
  ...
</application>

...
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
```

5.- Definir iconos y splashcreens en android/app/src/main/res.  

6.- Abrir proyecto de AndroidStudio:
```bash
$ npx cap open android
```

### Recompilar apk (android) luego de cambios en la versión web:
```bash
$ npm run build && npx cap sync
$ npx cap open android
```

### Compilar versión release con AndroidStudio:  
1.- Editar versionName y versionCode en android/app/build.gradle   
2.- Verificar el valor de "targetSdkVersion" en android/variables.gradle
3.- Ir al menú Build -> Generate Signed Bundle/APK...  
4.- Ingresar directorio de la firma (.jks), claves "Key Store Password" y "Key Password".  
5.- Generar app-release.apk o app-release.aab.   
6.- Preparar capturas de pantalla y lista de cambios.   


### Extension Auravant
1.- Para compilar extension Auravant, agregar el siguiente tag dentro del ```<head>``` de index.html
```html
<script src="https://auraview.auravant.com/sdk/v1.0/aura-package_v1.0.js"></script>
``` 
2.- Compilar
```bash
$ npm run build
```

3.- Comprimir carpeta dist

4.- Subir


### Backlog

  - [x] Parámetros.  
    - [x] Cálculo de parámetros.  
    - [x] Agregado a reporte.  
  - [ ] Ritmo.  
    - [x] Selección de ritmo y reproducción de audio.  
    - [ ] Iconos y archivo de audio.  
  - [x] Insumos.  
    - [x] Cálculo de insumos.  
    - [x] Agregado a reporte.  
  - [x] Reportes.  
    - [x] Creación, eliminación, consulta.  
    - [x] Convertir a PDF.  
  - [x] Informacion y ayuda.  
    - [x] Información acerca de.  
    - [x] Modo ayuda.  
