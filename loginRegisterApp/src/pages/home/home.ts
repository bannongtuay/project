
import { Component, ViewChild } from '@angular/core';

import { NavController, AlertController } from 'ionic-angular';

import { RegisterPage } from '../register/register';

import { Http, Headers, RequestOptions } from '@angular/http';

import { LoadingController } from 'ionic-angular';

import 'rxjs/add/operator/map';

import { HttpParams } from '@angular/common/http';



@Component({

    selector: 'page-home',

    templateUrl: 'home.html'

})

export class HomePage {

    @ViewChild("username") username;

    @ViewChild("password") password;

    data: string;

    constructor(public navCtrl: NavController, public alertCtrl: AlertController,

        private http: Http, public loading: LoadingController) {

    }

    

    signUp() {

        this.navCtrl.push(RegisterPage);

    }
    

    signIn() {

        //// check to confirm the username and password fields are filled

        if (this.username.value == "") {

            let alert = this.alertCtrl.create({

                title: "ATTENTION",

                subTitle: "Username field is empty",

                buttons: ['OK']


            });

            alert.present();

            

        } else

            if (this.password.value == "") {

                let alert = this.alertCtrl.create({

                    title: "ATTENTION",

                    subTitle: "Password field is empty",

                    buttons: ['OK']

                });

                alert.present();

            }

            else {

                var headers = new Headers();

                headers.append('Content-Type', 'application/x-www-form-urlencoded');

                let options = new RequestOptions({ headers: headers });

                const data = new HttpParams().set('case', 'login').set('username', this.username.value).set('password', this.password.value);

                let loader = this.loading.create({

                    content: 'Processing please wait…',

                });

                loader.present().then(() => {

                    this.http.post('http://localhost:80/ionic2php/json.php', data.toString(), options)

                        .map(res => res.json())

                        .subscribe(res => {

                            console.log(res)

                            loader.dismiss()

                            if (res == "Your Login success") {

                                let alert = this.alertCtrl.create({

                                    title: "CONGRATS",

                                    subTitle: (res),

                                    buttons: ['OK']

                                });

                                alert.present();

                            } else {

                                let alert = this.alertCtrl.create({

                                    title: "ERROR",

                                    subTitle: "Your Login Username or Password is invalid",

                                    buttons: ['OK']

                                });

                                alert.present();

                            }

                        });

                });

            }

    }

}