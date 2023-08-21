package com.candycrush.game;

import android.app.Application;

public class App extends Application {

    public static App instance;

    public static App getInstance() {
        return instance;
    }

    @Override
    public void onCreate() {
        super.onCreate();
       Preferences.init(this);

        instance = this;

    }


    @Override
    public void onTerminate() {
        // Executed when the program terminates
        super.onTerminate();
    }
}
