package com.candycrush.game.data;


import com.candycrush.game.network.NetworkCall;
import com.candycrush.game.network.ServiceCallBack;

public interface DataSource {


    void getAdKeys(ServiceCallBack myAppointmentPresenter, NetworkCall networkCall);


}

