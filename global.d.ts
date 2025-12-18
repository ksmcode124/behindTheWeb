declare module "*.jpg"; //rill ini saran dari GPT biar bisa import gambar, klo dihapus keknya bisa soalnya udh nyoba jpg tanpa definisi variabel bisa
declare module "*.png";
declare module "*.jpeg";
declare module "*.webp";
declare module "*.svg" {
    let content: any;
    export { content as default };
}