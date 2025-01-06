'use client';
import { useState } from 'react';
import { RiMenuSearchLine, RiMenuSearchFill } from 'react-icons/ri';
import { Menu, Button } from 'antd';
import style from '../../app/catalogo/page.module.css'

export default function MenuProdutos({ items }) {
  const [collapsed, setCollapsed] = useState(true);

  const alterarFiltro = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={style.itens_direita}>
      <Button type="button" className={style.filtro} onClick={alterarFiltro}>
        {collapsed ? <RiMenuSearchLine /> : <RiMenuSearchFill />}
      </Button>
      <div className={style.fundo_itens}>
        {!collapsed && (
          <Menu
            className={style.menu_itens}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            theme="white"
            inlineCollapsed={collapsed}
            items={items}
          />
        )}
      </div>
    </div>
  );
}
