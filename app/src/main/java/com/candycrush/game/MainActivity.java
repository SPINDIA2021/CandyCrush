/*
       Licensed to the Apache Software Foundation (ASF) under one
       or more contributor license agreements.  See the NOTICE file
       distributed with this work for additional information
       regarding copyright ownership.  The ASF licenses this file
       to you under the Apache License, Version 2.0 (the
       "License"); you may not use this file except in compliance
       with the License.  You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing,
       software distributed under the License is distributed on an
       "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
       KIND, either express or implied.  See the License for the
       specific language governing permissions and limitations
       under the License.
 */

package com.candycrush.game;

import android.os.Bundle;
import org.apache.cordova.*;
import android.util.Log;
import com.google.ads.consent.*;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;

public class MainActivity extends CordovaActivity implements AppKeyContact.View
{
    ConsentForm form;
     AppKeyContact.Presenter presenter;
    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);

        new AppKeyPresenter(Injection.provideLoginRepository(this), this);

        presenter.getAdKeys(this);


        // enable Cordova apps to be started in the background
        Bundle extras = getIntent().getExtras();
        if (extras != null && extras.getBoolean("cdvStartInBackground", false)) {
            moveTaskToBack(true);
        }

        loadUrl(launchUrl);


        // Here is GDPR Simple Code

        ConsentInformation consentInformation = ConsentInformation.getInstance(MainActivity.this);
        String[] publisherIds = {"pub-9266737075296357"};
        consentInformation.requestConsentInfoUpdate(publisherIds, new ConsentInfoUpdateListener() {
            @Override
            public void onConsentInfoUpdated(ConsentStatus consentStatus) {
                // User's consent status successfully updated.
                Log.d(TAG,"onConsentInfoUpdated");
                switch (consentStatus){
                    case PERSONALIZED:
                        Log.d(TAG,"PERSONALIZED");
                        ConsentInformation.getInstance(MainActivity.this)
                                .setConsentStatus(ConsentStatus.PERSONALIZED);
                        break;

                    case NON_PERSONALIZED:
                        Log.d(TAG,"NON_PERSONALIZED");
                        ConsentInformation.getInstance(MainActivity.this)
                                .setConsentStatus(ConsentStatus.PERSONALIZED);
                        break;

                    case UNKNOWN:
                        Log.d(TAG,"UNKNOWN");
                        if(ConsentInformation.getInstance(MainActivity.this).isRequestLocationInEeaOrUnknown()){


                            URL privacyUrl = null;
                            try {
                                // TODO: Replace with your app's privacy policy URL.
                                privacyUrl = new URL("https://sites.google.com/");
                            } catch (MalformedURLException e) {
                                e.printStackTrace();
                                // Handle error.
                            }
                            form = new ConsentForm.Builder(MainActivity.this, privacyUrl)
                                    .withListener(new ConsentFormListener() {
                                        @Override
                                        public void onConsentFormLoaded() {
                                            // Consent form loaded successfully.
                                            Log.d(TAG,"onConsentFormLoaded");
                                            showform();
                                        }

                                        @Override
                                        public void onConsentFormOpened() {
                                            // Consent form was displayed.
                                            Log.d(TAG,"onConsentFormOpened");
                                        }

                                        @Override
                                        public void onConsentFormClosed(
                                                ConsentStatus consentStatus, Boolean userPrefersAdFree) {
                                            // Consent form was closed.
                                            Log.d(TAG,"onConsentFormClosed");
                                        }

                                        @Override
                                        public void onConsentFormError(String errorDescription) {
                                            // Consent form error.
                                            Log.d(TAG,"onConsentFormError");
                                            Log.d(TAG,errorDescription);
                                        }
                                    })
                                    .withPersonalizedAdsOption()
                                    .withNonPersonalizedAdsOption()
                                    .build();

                            form.load();

                        }else{
                            Log.d(TAG,"PERSONALIZED else");
                            ConsentInformation.getInstance(MainActivity.this)
                                    .setConsentStatus(ConsentStatus.PERSONALIZED);
                        }


                        break;

                    default:
                        break;
                }
            }

            @Override
            public void onFailedToUpdateConsentInfo(String errorDescription) {
                // User's consent status failed to update.
                Log.d(TAG,"onFailedToUpdateConsentInfo");
                Log.d(TAG,errorDescription);
            }
        });




    }

    private void showform(){
        if (form!=null){
            Log.d(TAG,"show ok");
            form.show();
        }

    }

    @Override
    public void adKeysResponse(ArrayList<AdKeysResponse> adKeysResponse) {

        for (int i=0;i<adKeysResponse.size();i++)
        {
            if (adKeysResponse.get(i).getName().equals("candy crush Interstitial ads"))
            {
                Preferences.saveValue(Preferences.Inter,adKeysResponse.get(i).getApikey());
            }else if (adKeysResponse.get(i).getName().equals("candy crush banner"))
            {
                Preferences.saveValue(Preferences.Banner,adKeysResponse.get(i).getApikey());
            }else if (adKeysResponse.get(i).getName().equals("candy crush Interstitial ads"))
            {
                Preferences.saveValue(Preferences.Reward,adKeysResponse.get(i).getApikey());
            }

        }

        //  mAdview.setAdUnitId(Preferences.getString(Preferences.Banner));
    }

    @Override
    public void setPresenter(AppKeyContact.Presenter presenter) {
        this.presenter=presenter;
    }

}

