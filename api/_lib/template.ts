import {readFileSync} from 'fs';
import {sanitizeHtml} from './sanitizer';
import {ParsedRequest} from './types';

const rglr = readFileSync(`${__dirname}/../_fonts/OpenSans-Regular.ttf`).toString('base64');
const bold = readFileSync(`${__dirname}/../_fonts/OpenSans-Bold.ttf`).toString('base64');
const background = 'data:image/png;base64,' + readFileSync(`${__dirname}/../images/bg.png`).toString('base64');
const workIcon = 'data:image/png;base64,' + readFileSync(`${__dirname}/../images/baseline_work_white_18dp.png`).toString('base64');
const locationIcon = 'data:image/png;base64,' + readFileSync(`${__dirname}/../images/baseline_location_on_white_18dp.png`).toString('base64');
const moneyIcon = 'data:image/png;base64,' + readFileSync(`${__dirname}/../images/baseline_local_atm_white_18dp.png`).toString('base64');
const jainzynierLogo = 'data:image/png;base64,' + readFileSync(`${__dirname}/../images/jainzynierlogo.png`).toString('base64');

function getCss() {
    return `
    @font-face {
        font-family: 'Open Sans';
        font-style:  normal;
        font-weight: normal;
        src: url(data:font/ttf;charset=utf-8;base64,${rglr});
    }

    @font-face {
        font-family: 'Open Sans';
        font-style:  normal;
        font-weight: bold;
        src: url(data:font/ttf;charset=utf-8;base64,${bold});
    }

    .img-fluid {
      max-width: 100%;
      height: auto;
    }

    body {
        height: 100vh;
        font-family: 'Open Sans';
          background-image: url(${background});
          background-repeat: no-repeat; /* Do not repeat the image */
          background-size: cover;
    }

    code {
        color: #D400FF;
        font-family: 'Vera';
        white-space: pre-wrap;
        letter-spacing: -5px;
    }

    code:before, code:after {
        content: '\`';
    }

    .logo-wrapper {
        display: flex;
        align-items: center;
        align-content: center;
        justify-content: center;
        justify-items: center;
        width: 180px;
        height: 180px;
        background: white;
    }

    .plus {
        color: #BBB;
        font-family: Times New Roman, Verdana;
        font-size: 100px;
    }

    .spacer {
          height: 6px;
          width: 60px;
          background-color: rgba(240,200,5,1);
          margin-top: 30px;
          margin-bottom: 30px;
    }

    .company-name {
          color: rgba(83,123,206,1);
          font-size: 30px;
          font-weight: 600;
          letter-spacing: 0.27px;
          line-height: 60px;
    }
    
    .icon {
      height: 30px;
      position: relative;
      top: 5px;
      opacity: 0.6;
      margin-right: 8px;
    }
    
    .cover {
          padding: 70px;
    }
    
    .apply-btn {
        color: rgba(38,38,38,1);
      font-size: 32px;
      font-weight: bold;
      letter-spacing: 0.2px;
      line-height: 80px;
      text-align: center;
      height: 80px;
      width: 290px;
        background-color: rgba(255,212,0,1);
    }
    
    .salary,
    .city {
      color: rgba(255,255,255,1);
      font-size: 30px;
      font-weight: 600;
      letter-spacing: 0.27px;
      line-height: 60px;
    }
    
    .emoji {
        height: 1em;
        width: 1em;
        margin: 0 .05em 0 .1em;
        vertical-align: -0.1em;
    }
    
    .title {
            width: 100%;
            padding-right: 15px;
          color: rgba(255,255,255,1);
          font-size: 46px;
          font-weight: bold;
          letter-spacing: 0.55px;
          line-height: 66px;
    }`;
}

export function getHtml(parsedReq: ParsedRequest) {
    const {title, city, salary, logoUrl, companyName} = parsedReq;
    const logo = logoUrl === 'null' || logoUrl === 'undefined' ? null : logoUrl;
    return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        ${getCss()}
    </style>
    <body>
        <div class="cover">
            <div style="display:flex;">
                <div style="width:100%;">
                  <div class="title">${sanitizeHtml(title)}</div>
                  <div class="spacer"></div>
                  <div class="company-name">
                    <img
                        class="icon"
                        src="${workIcon}"
                    />
                    ${sanitizeHtml(companyName)}</div>
                    <div class="city">
                    <img
                        class="icon"
                        src="${locationIcon}"
                    />
                    ${sanitizeHtml(city)}</div>
                    <div class="salary">
                    <img
                        class="icon"
                        src="${moneyIcon}"
                    />
                    ${sanitizeHtml(salary)}</div> 
                </div>
     
                <div style="flex: 0 0 180px;display:${logo ? 'block' : 'none'}">
                    <div class="logo-wrapper">
                       <img
                            class="logo img-fluid"
                            src="${logo}"
                        />
                    </div>

                </div>
            </div>
            
            <div style="position: fixed;bottom: 60px;left: 70px;right: 70px">
                        <div style="display:flex;align-items: center;">
                <div style="flex:1 1 100%;"></div>
                <div style="flex:1 1 100%;"><div class="apply-btn">Aplikuj teraz</div></div>
                <div style="flex:1 1 100%;text-align: right">
                    <img
                        class="img-fluid"
                        style="height:40px"
                        alt="jainzynier.pl logo"
                        src="${jainzynierLogo}"
                    />
                </div>
            </div>
            </div>


        </div>
    </body>
</html>`;
}
