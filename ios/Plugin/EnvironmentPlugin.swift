import Foundation
import Capacitor

/**
 * Capacitor plugin to manage the environment configurations
 */
@objc(EnvironmentPlugin)
public class EnvironmentPlugin: CAPPlugin {
    private let implementation = Environment()

    @objc func get(_ call: CAPPluginCall) {
        do {
            call.resolve(try implementation.get())
        } catch let error as NSError {
            print(error)
            call.reject(error.localizedDescription, String(error.code), error)
        }
    }
}
