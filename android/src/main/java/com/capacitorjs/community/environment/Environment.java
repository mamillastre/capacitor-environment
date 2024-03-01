package com.capacitorjs.community.environment;

import android.util.Log;

public class Environment {

    public String echo(String value) {
        Log.i("Echo", value);
        return value;
    }
}
