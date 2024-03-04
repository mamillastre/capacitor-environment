import Foundation

@objc public class Environment: NSObject {
    
    private var jsonObject: [String:Any]? = nil
    
    @objc public func get() throws -> [String:Any] {
        
        if (jsonObject == nil) {
            // Read the file only one time
            
            var data: Data? = nil
            
            let bundlePath = Bundle.main.path(forResource: "environment", ofType: "json", inDirectory: Bundle.main.path(forResource: "environment", ofType: nil))
            if (bundlePath == nil) {
                throw NSError(domain: "Unable to load environment.json. Check if the file is available in the iOS environment folder or run npx cap copy (if you configured the environment copy)", code: 0)
            }
            data = try String(contentsOfFile: bundlePath!).data(using: .utf8)
            
            let json = try JSONSerialization.jsonObject(with: data!, options: []) as? [String:Any]
            if (json == nil) {
                throw NSError(domain: "Unable to parse environment.json. Make sure it's valid json", code: 1)
            }
            
            jsonObject = json
        }
        
        return jsonObject!;
    }
}
