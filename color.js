const path = require("path");
const { generateTheme } = require("antd-theme-generator");
// ant-design-vue/dist/antd.less
const options = {
    antDir: path.join(__dirname, "./node_modules/ant-design-vue"), //antdv对应具体位置
    stylesDir: path.join(__dirname, "./src/assets/less"), //less文件夹对应具体位置
    varFile: path.join(__dirname, "./src/assets/less/variables.less"), //文件夹变量对应具体位置
    themeVariables: ["@primary-color"],
    indexFileName: "./public/index.html", //首页路径
    outputFilePath: path.join(__dirname, "./public/color.less"), //打包出来的文件
};
generateTheme(options)
    .then(() => {
        console.log("Theme generated successfully");
    })
    .catch((error) => {
        console.log("Error", error);
    });
