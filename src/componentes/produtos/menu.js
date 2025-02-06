'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link'; 
import { RiMenuSearchLine, RiMenuSearchFill } from 'react-icons/ri';
import { MdFavoriteBorder } from 'react-icons/md';
import { HiOutlineShoppingCart } from 'react-icons/hi';
import { Menu, Button } from 'antd';
import style from '../../app/catalogo/page.module.css';

export default function MenuProdutos({ items }) {
  const [collapsed, setCollapsed] = useState(true);
  const [logado, setLogado] = useState(false);

  // Alterna o filtro
  const alterarFiltro = () => {
    setCollapsed(!collapsed);
  };

  // Verifica se o usuário está logado
  useEffect(() => {
    const status = sessionStorage.getItem('logado');
    setLogado(status === 'true');
  }, []);

  return (
    <div className={style.menuCat}>
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

      {logado && (
        <div className={style.itens_esquerda}>
          <Link href="/favoritos">
            <button type="button" className={style.favorito}>
              <MdFavoriteBorder />
            </button>
          </Link>
          <div className={style.espaco_fc}></div>
          <Link href="/carrinho">
            <button type="button" className={style.carrinho}>
              <HiOutlineShoppingCart />
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
