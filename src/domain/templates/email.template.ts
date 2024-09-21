import { envs } from "../../config/envs.plugin";

export function generateInfectionEmailTemplate(lat: number, lng: number, gender: string, age: number, creationDate: Date): string {
    const mapboxURL = generateMapboxStaticImageURL(lat, lng);
    return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Detalles del Incidente</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                color: #333;
                margin: 0;
                padding: 0;
            }
            .container {
                width: 100%;
                max-width: 600px;
                margin: 20px auto;
                background-color: #ffffff;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                overflow: hidden;
            }
            .header {
                background-color: #007BFF;
                color: #ffffff;
                padding: 20px;
                text-align: center;
            }
            .header h1 {
                margin: 0;
                font-size: 24px;
            }
            .content {
                padding: 20px;
            }
            .content p {
                margin: 10px 0;
            }
            .footer {
                background-color: #f4f4f4;
                color: #777;
                padding: 10px;
                text-align: center;
                font-size: 12px;
            }
            .map-img {
                width: 100%;
                height: auto;
                border-radius: 10px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Detalles del caso de infección de la Viruela del Mono</h1>
            </div>
            <div class="content">
                <p><strong>Latitud:</strong> ${lat}</p>
                <p><strong>Longitud:</strong> ${lng}</p>
                <p><strong>Género:</strong> ${gender}</p>
                <p><strong>Edad:</strong> ${age}</p>
                <p><strong>Fecha de Registro:</strong> ${creationDate}</p>
                <img src="${mapboxURL}" class="map-img"/>
            </div>
            <div class="footer">
                <p>Este es un correo generado automáticamente. Por favor, no responda a este mensaje.</p>
            </div>
        </div>
    </body>
    </html>
    `;
}

export const generateMapboxStaticImageURL= (latitude:number, longitude:number) =>{
    const accessToken = envs.MAPBOX_ACCESS_TOKEN; // Reemplaza con tu token de acceso de Mapbox
    const zoom = 13; // Nivel de zoom
    const width = 800; // Ancho de la imagen
    const height = 500; // Altura de la imagen
 
    return `https://api.mapbox.com/styles/v1/mapbox/light-v11/static/pin-l-embassy+f74e4e(${longitude},${latitude})/${longitude},${latitude},${zoom}/${width}x${height}?access_token=${accessToken}`;
}