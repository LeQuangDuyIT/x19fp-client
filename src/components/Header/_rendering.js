import Caterogies from './SubMenu/_Categories';

export const headerMenu = [
  { title: 'Danh mục nổi bật' },
  { title: 'Đề thi theo môn', subMenu: Caterogies, subMenuTitle: 'Danh sách môn học' },
  { title: 'Giáo viên' },
  { title: 'Game trắc nghiệm', isHot: true }
];
