package com.candycrush.game;

import android.content.Context;

import java.util.ArrayList;

public interface AppKeyContact {
    interface View extends BaseView<Presenter> {
        void adKeysResponse(ArrayList<AdKeysResponse> adKeysResponse);
    }

    interface Presenter {
        void getAdKeys( Context context);
    }

    }
