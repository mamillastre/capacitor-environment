package com.capacitorjs.community.environment;

import android.content.Context;
import android.content.res.AssetManager;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import org.json.JSONException;
import org.json.JSONObject;

public class Environment {

    private JSONObject jsonObject = null;

    /**
     * Get the JSON environment configuration from the assets
     * @return The JSON configuration
     * @throws JSONException Thrown on any issues when parsing the JSON format of the environment file.
     * @throws IOException Thrown on any issues when reading the provided file path.
     */
    public JSONObject get(Context context) throws JSONException, IOException {
        if (this.jsonObject == null) {
            // Read the file only one time
            String jsonString = this.readFile(context.getAssets(), "environment.json");
            jsonObject = new JSONObject(jsonString);
        }

        return this.jsonObject;
    }

    /**
     * Read a plaintext file.
     *
     * @param assetManager Used to open the file.
     * @param fileName The path of the file to read.
     * @return The contents of the file path.
     * @throws IOException Thrown on any issues when reading the provided file path.
     */
    public static String readFile(AssetManager assetManager, String fileName) throws IOException {
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(assetManager.open(fileName)))) {
            StringBuilder buffer = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                buffer.append(line + "\n");
            }

            return buffer.toString();
        }
    }
}
