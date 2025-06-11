npm install
npm start
npm install react-barcode

--------------------------
jsbarcode tiene incompatibilidad con react-barcode, hay que desinstalarlo:
npm uninstall jsbarcode

Limpia la caché y node_modules
rd /s /q node_modules
del package-lock.json
npm install
--------------------------
