#import <Foundation/Foundation.h>
#import <Capacitor/Capacitor.h>

CAP_PLUGIN(EnvironmentPlugin, "Environment",
           CAP_PLUGIN_METHOD(get, CAPPluginReturnPromise);
)
