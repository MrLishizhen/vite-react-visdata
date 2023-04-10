import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
//配置gzip npm install vite-plugin-compression -D
import compression from "vite-plugin-compression";

// https://vitejs.dev/config/
export default defineConfig({
    base: "/vite_vis/",
    plugins: [
        react(),
        //配置gzip
        compression({
            algorithm: "gzip",
            ext: ".gz",
            threshold: 500,
        }),
    ],
    resolve: {
        // 路径别名
        alias: {
            "@": path.resolve(__dirname, "./src"), //配置@别名
        },
    },
    build: {
        outDir: "dist", //设置输出目录
        assetsDir: "assets", //设置静态资源目录
        cssCodeSplit: true, //启用CSS代码拆分
        sourcemap: true, //生成源映射文件
        rollupOptions: {
            output: {
                entryFileNames: "js/[name].[hash].js", //设置JS文件名格式
                chunkFileNames: "js/[name].[hash].js", //设置代码拆分后的文件名格式
                assetFileNames: "assets/[name].[hash].[ext]", //设置静态资源文件名格式
            },
        },
    },
});
