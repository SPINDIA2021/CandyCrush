package com.candycrush.game.network;


import retrofit2.Response;


public interface ServiceCallBack
{
    public void onSuccess(int tag, Response<BaseResponse> baseResponse);
    public void onFail(int requestTag, Throwable t);
}
