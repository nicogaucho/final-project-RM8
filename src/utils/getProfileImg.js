export default function getProfileImg(fileUrl) {
  if (!fileUrl) {
    return 'https://icon-library.com/images/add-photo-icon/add-photo-icon-19.jpg';
  }
  return `https://ulovwvhtsiyhnioiqbdo.supabase.co/storage/v1/object/public/avatars/${fileUrl}`;
}
