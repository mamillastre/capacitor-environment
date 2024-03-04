package com.capacitorjs.community.environment;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

import org.json.JSONException;

import java.io.IOException;

@CapacitorPlugin(name = "Environment")
public class EnvironmentPlugin extends Plugin {

    private Environment implementation = new Environment();

    /**
     * Return the environment configuration as JSObject
     */
    @PluginMethod
    public void get(PluginCall call) {
        try {
            JSObject object = JSObject.fromJSONObject(implementation.get(getContext()));
            call.resolve(object);
        } catch (IOException ex) {
            call.reject("Unable to load environment.json. Check if the file is available in the Android assets folder or run npx cap copy (if you configured the environment copy)", ex);
        } catch (JSONException ex) {
            call.reject("Unable to parse environment.json. Make sure it's valid json", ex);
        }
    }
}
