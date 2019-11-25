import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class DolphinService {

    constructor(private http: HttpClient) {
    }

    getSharpP() {
        return new Promise((resolve, reject) => {
            this.http.post('https://dolphin.jump-technology.com:8443/api/v1/ratio/invoke',
            {
                'asset': [1821],
                'ratio': [12],
                start_date: new Date(2013, 6, 14).toISOString(),
                end_date: new Date(2019, 4, 18).toISOString()
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + btoa('EPITA_GROUPE2:xeLLV8HzuV6urNNr')
                }
            })
            .subscribe(res => {

                resolve(res);

            }, (err) => {
              reject(err);
            });
        });
    }
    

    getSharp(assetArray) {
        console.log('assetId');
        console.log(assetArray);
        return new Promise((resolve, reject) => {
            this.http.post('https://dolphin.jump-technology.com:8443/api/v1/ratio/invoke',
            {
                'asset': assetArray,
                'ratio': [12],
                start_date: new Date(2013, 6, 14).toISOString(),
                end_date: new Date(2019, 4, 18).toISOString()
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + btoa('EPITA_GROUPE2:xeLLV8HzuV6urNNr')
                }
            })
            .subscribe(res => {
                let array = [];
                for (var key in res) {
                    var number = Number(res[key][12]['value'].replace(/,/g, '.'));
                    if (isNaN(number))
                        array.push(-10000);
                    else
                        array.push(number);
                }
                console.log('sharpRatio');
                console.log(array);
                let copy = Array.from(array);
                let top10 = [];
                for (var i = 0; i < 20; i++) {
                    const indexOfMaxValue = copy.indexOf(Math.max(...copy));
                    top10.push(indexOfMaxValue);
                    copy[indexOfMaxValue] = -1000;
                }
                console.log('top10');
                console.log(top10);

                resolve(res);
                // 

            }, (err) => {
              reject(err);
            });
        });
    }

    getPortfolio() {
        return new Promise((resolve, reject) => {
            this.http.get('https://dolphin.jump-technology.com:8443/api/v1/portfolio/1821/dyn_amount_compo',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + btoa('EPITA_GROUPE2:xeLLV8HzuV6urNNr')
                }
            })
            .subscribe(res => {
                console.log(res);
                // 

            }, (err) => {
              reject(err);
            });
        });
    }

    putPortfolio() {

        return new Promise((resolve, reject) => {
            this.http.put('https://dolphin.jump-technology.com:8443/api/v1/portfolio/1821/dyn_amount_compo',
            {
                'label': 'EPITA_PTF_2',
                'currency': {
                    "code": "EUR"
                },
                'type': 'front',
                'values': {
                    "2013-06-14": [
                    {
                        "asset": {
                            "asset": 1984,
                            'quantity': 10
                        }
                    },
                    {
                        "asset": {
                            "asset": 1738,
                            'quantity': 9
                        }
                    },
                    {
                        "asset": {
                            "asset": 1792,
                            'quantity': 12
                        }
                    },
                    {
                        "asset": {
                            "asset": 2113,
                            'quantity': 20
                        }
                    },
                    {
                        "asset": {
                            "asset": 1739,
                            'quantity': 75
                        }
                    },
                    {
                        "asset": {
                            "asset": 1522,
                            'quantity': 40
                        }
                    },
                    {
                        "asset": {
                            "asset": 1791,
                            'quantity': 50
                        }
                    },
                    {
                        "asset": {
                            "asset": 1940,
                            'quantity': 100
                        }
                    },
                    {
                        "asset": {
                            "asset": 2116,
                            'quantity': 15
                        }
                    },
                    {
                        "asset": {
                            "asset": 2090,
                            'quantity': 7
                        }
                    },
                    {
                        "asset": {
                            "asset": 2084,
                            'quantity': 15
                        }
                    },
                    {
                        "asset": {
                            "asset": 1793,
                            'quantity': 50
                        }
                    },
                    {
                        "asset": {
                            "asset": 1741,
                            'quantity': 50
                        }
                    },
                    {
                        "asset": {
                            "asset": 2079,
                            'quantity': 250
                        }
                    },
                    {
                        "asset": {
                            "asset": 1498,
                            'quantity': 1
                        }
                    },
                    {
                        "asset": {
                            "asset": 2105,
                            'quantity': 4
                        }
                    },
                    {
                        "asset": {
                            "asset": 2149,
                            'quantity': 8
                        }
                    }
                    ]
                },
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + btoa('EPITA_GROUPE2:xeLLV8HzuV6urNNr')
                }
            })
            .subscribe(res => {
                console.log(res);

                // 

            }, (err) => {
              reject(err);
            });
        });
    }


    prepare() {

    return new Promise((resolve, reject) => {
      this.http.get<any[]>('https://dolphin.jump-technology.com:8443/api/v1/asset',
      {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + btoa('EPITA_GROUPE2:xeLLV8HzuV6urNNr')
        }
      })
        .subscribe(data => {
            let len;
            if (data)
                len = data.length;
            console.log('data');
            console.log(data);
            let industry = [];

            let assetId = [];
            let sharpRatio = [];
            let assetIndustry = [];
            for (var i = 0; i < data.length; ++i) {
                if (data[i]['TYPE']['value'] == 'PORTFOLIO')
                    console.log(i);
                if (data[i]['ASSET_DATABASE_ID']) {
                    assetId[i] = Number(data[i]['ASSET_DATABASE_ID']['value']);
                }
                else
                    assetId[i] = -1;   
                if (data[i]['INDUSTRY'] &&  data[i]['INDUSTRY']['value'])
                    assetIndustry[i] = data[i]['INDUSTRY']['value'];
                let v = data[i]['INDUSTRY'];
                // console.log(v);
                // if (v && v['value'] == 'Technologie') {
                if (v && v['value'] && (industry.indexOf(v['value']) === -1)) {
                    // console.log('biba');
                    industry.push(data[i]['INDUSTRY']['value']);
                }
            }

            this.getSharp(assetId);

            resolve(data);
        }, (err) => {
          reject(err);
      });
    });
    }

}