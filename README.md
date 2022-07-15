# SCRAPPING BACKEND
Esta Aplicación está costruido bajo el "reto de SILABUZ!" 2022.

## DESCRIPCION.

La Aplicación realiza scrapping hacia la web de slides.com. usando la Librería de "puppeteer" y "puppeteer-cluster".

## PROCESO

 1. Captura de links de slides
 2. Scrapping concurrente a los más de 40 links de slikes disponidles
 3. Disposición de datos en el endpoint de la API
 4. Consumo en el frontend https://github.com/Artemides/scrapping-frontend

## RESULTADOS.

 1. extracción de Slides.
 2. extracción de titulos.
 3. extracción de autores.
 4. extracción de likes por slides.
 5. extracción de visitas por slikes.

## DETALLES.

los resultados estan expuestas en el enpoint http://localhost:PORT/slides-scrap.

## LINKS.

puedes visitar el frontend para mayores detalles y resultados en https://github.com/Artemides/scrapping-frontend

## COMANDOS

npm install

npm run start

## COMENTARIOS

La Aplicación no está optimizada para procesar multiples url's simultaneos, en consecuencia puede tomar alguna demora "Paciencia" 
