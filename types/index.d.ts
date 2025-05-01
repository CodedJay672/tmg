interface BottomBarProps {
  path: string;
  icon: React.ReactNode;
}

interface ProductUploadProps {
  name: string;
  price: string;
  imgUrl: string;
  category: string;
}

type TCart = {
  id: string;
  name: string;
  category: string;
  imgUrl: string;
  price: number;
  qty: number;
};
