package com.candycrush.game.network;


import com.candycrush.game.AdKeysResponse;

import java.util.ArrayList;

import okhttp3.RequestBody;
import retrofit2.Call;
import retrofit2.http.Multipart;
import retrofit2.http.POST;
import retrofit2.http.Part;


public interface IApi {


   /*String BASE_URL="https://mewar.sahayatamoney.com/Applogin/";*/
   String BASE_URL="https://pocket.spindiabazaar.com/Appapi/";
//pocket.spindiabazaar.com


    int COMMON_TAG = 10030;


    @Multipart
    @POST("apikeys")
    Call<BaseResponse<ArrayList<AdKeysResponse>>> getAdKeys(@Part("api") RequestBody api );




}
