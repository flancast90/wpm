export const args = {
 install: {
  type: String,
  help: "install <package-name> - install a package given its name."
 },
 uninstall: {
  type: String,
  help: "uninstall <package-name> - uninstall a package given its name."
 },
 "--help": {
  type: Boolean,
  help: "--help - list supported functions."
 },
 "--update": {
  type: Boolean,
  help: "--update - attempt to force-update the local list of warnings."
 },
 "i": {
  default: "install",
  help: "alias for install"
 },
 "u": {
  default: "uninstall",
  help: "alias for uninstall"
 },
}
