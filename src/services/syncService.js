// src/services/syncService.js

export const sincronizaTodo = async (fileName, date) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const requestData = {
          id_app: 1,
          user: "admin",
          ret_cod: 0,
          ret_txt: "Ok",
          file_name: fileName,
          date: date
        };
  
        if (Math.random() > 0.2) {
          resolve({
            success: true,
            message: "Todo correcto",
            response: { ...requestData, ret_cod: 0, ret_txt: "Todo correcto" }
          });
        } else {
          resolve({
            success: false,
            message: "Todo INcorrecto",
            response: { ...requestData, ret_cod: -1, ret_txt: "Todo INcorrecto" }
          });
        }
      }, 2000);
    });
  };
  