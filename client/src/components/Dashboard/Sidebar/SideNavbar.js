import { Link, useLocation } from 'react-router';
import {
  FaTachometerAlt,
  FaShoppingCart,
  FaBox,
  FaLayerGroup,
  FaPalette,
  FaUsers,
  FaMoneyBillWave,
  FaBell,
  FaCog,
} from 'react-icons/fa';

function SideNavbar({ onLinkClick }) {
  const location = useLocation();

  const navtext = [
    { text: 'Dashboard', link: './', icon: FaTachometerAlt },
    { text: 'Orders', link: './orders', icon: FaShoppingCart },
    { text: 'Products', link: './products', icon: FaBox },
    { text: 'Category', link: './categorys', icon: FaLayerGroup },
    { text: 'Colors', link: './colors', icon: FaPalette },
    { text: 'Users', link: './users', icon: FaUsers },
    { text: 'Payments', link: './payments', icon: FaMoneyBillWave },
    { text: 'Notification', link: './notifications', icon: FaBell },
    { text: 'Settings', link: './settings', icon: FaCog },
  ];

  const isActive = (link) => {
    const currentPath = location.pathname;
    const basePath = '/dashboard';
    
    if (link === './') {
      return currentPath === basePath || currentPath === basePath + '/';
    }
    
    return currentPath.includes(link.replace('./', ''));
  };

  return (
    <nav className="flex w-full flex-1 overflow-y-auto">
      <ul className="flex w-full flex-col gap-1 px-3">
        {navtext.map((item, index) => {
          const Icon = item.icon;
          const active = isActive(item.link);

          return (
            <li key={index} className="w-full">
              <Link
                className={`flex h-11 w-full items-center gap-3 rounded-lg px-4 text-sm font-medium transition-all ${
                  active
                    ? 'bg-blue-600 text-white shadow-md dark:bg-blue-700'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
                to={item.link}
                onClick={onLinkClick}
              >
                <Icon size={18} />
                <span>{item.text}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default SideNavbar;
