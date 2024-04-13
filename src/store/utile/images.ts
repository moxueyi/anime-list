// 导入assets/images目录下所有图片

const images = import.meta.glob('../../assets/images/*.webp', { eager: true });

const imagesURL = Object.values(images).map((image: any) => image.default);

export default imagesURL;