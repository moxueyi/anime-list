export interface Anime {
    key: string,      // 番剧唯一标识
    name: string,     // 番剧名称
    category: string, // 番剧类型
    quarter: number,  // 季度
    year: number,     // 年份
    style: string[],    // 风格
    image: string,    // 图片链接
}
