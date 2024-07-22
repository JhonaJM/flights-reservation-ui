import { Menu } from 'antd'
import { Link } from 'react-router-dom';
import { BsPerson,BsArrowLeftSquare} from "react-icons/bs";
import { CiPlane } from 'react-icons/ci';

export const MenuList = ({ selectedKeys }: { selectedKeys: string[] }) => {
  return (
    
        <Menu  className='menu-bar' selectedKeys={selectedKeys} >
            <Menu.Item key="home" style={{color:'#001529'}} icon={<CiPlane />} >
                <Link style={{textDecoration:'none', color:'#001529'}} to="/home">Viaje</Link>
            </Menu.Item>           
            <Menu.SubMenu style={{textDecoration:'none', color:'#001529'}} className='profile' key="account" icon={<BsPerson />} title="Jhona JM" >
                <Menu.Item style={{textDecoration:'none', color:'#001529'}} key="singOut" icon={<BsArrowLeftSquare/>}  >
                    Salir
                </Menu.Item>                
            </Menu.SubMenu>
            
        </Menu>
  )
}
