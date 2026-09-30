'use client';

import { useEffect, useState } from 'react';

const API_URL =
    'https://my-custom-api-eta.vercel.app/api/products';

export default function CatalogPage() {
    const [products, setProducts] = useState<any[]>([]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [loading, setLoading] = useState(false);

    async function getProducts() {
        try {
            const res = await fetch(API_URL);

            if (!res.ok) {
                throw new Error('Gagal mengambil data produk');
            }

            const response = await res.json();

            setProducts(response.data || response);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getProducts();
    }, []);

    async function addProduct() {
        if (!name || !price || !stock) {
            alert('Semua data harus diisi!');
            return;
        }

        setLoading(true);

        try {
            const res = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: name,
                    price: Number(price),
                    stock: Number(stock),
                }),
            });

            if (!res.ok) {
                throw new Error('Gagal menambahkan produk');
            }

            setName('');
            setPrice('');
            setStock('');

            await getProducts();
        } catch (error) {
            console.error(error);
            alert('Gagal menambahkan produk');
        }

        setLoading(false);
    }

    async function deleteProduct(id: string | number) {
        const yakin = confirm('Yakin ingin menghapus produk ini?');

        if (!yakin) return;

        try {
            const res = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
            });

            if (!res.ok) {
                throw new Error('Gagal menghapus produk');
            }

            await getProducts();
        } catch (error) {
            console.error(error);
            alert('Gagal menghapus produk');
        }
    }

    return (
        <div
            style={{
                minHeight: '100vh',
                backgroundColor: '#000',
                color: '#fff',
                padding: '30px',
                fontFamily: 'Arial, sans-serif',
            }}
        >
            <div
                style={{
                    width: '535px',
                    maxWidth: '100%',
                    margin: '0 auto',
                }}
            >
                <h2
                    style={{
                        fontSize: '18px',
                        fontWeight: 'normal',
                        marginBottom: '5px',
                    }}
                >
                    Manajemen Produk (CRUD Consume API)
                </h2>

                {/* FORM TAMBAH PRODUK */}
                <div
                    style={{
                        border: '1px solid #aaa',
                        borderRadius: '10px',
                        padding: '22px',
                        marginBottom: '36px',
                    }}
                >
                    <h3
                        style={{
                            fontSize: '18px',
                            fontWeight: 'normal',
                            marginTop: '0',
                        }}
                    >
                        Tambah Produk Baru
                    </h3>

                    <label>Nama Produk:</label>

                    <input
                        type="text"
                        placeholder="Contoh: Mouse Wireless"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '12px',
                            marginTop: '8px',
                            marginBottom: '16px',
                            backgroundColor: '#050505',
                            color: '#fff',
                            border: '1px solid #aaa',
                            borderRadius: '5px',
                            fontSize: '16px',
                            boxSizing: 'border-box',
                        }}
                    />

                    <div
                        style={{
                            display: 'flex',
                            gap: '14px',
                        }}
                    >
                        <div style={{ flex: 1 }}>
                            <label>Harga (Rp):</label>

                            <input
                                type="number"
                                placeholder="150000"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    marginTop: '8px',
                                    backgroundColor: '#050505',
                                    color: '#fff',
                                    border: '1px solid #aaa',
                                    borderRadius: '5px',
                                    fontSize: '16px',
                                    boxSizing: 'border-box',
                                }}
                            />
                        </div>

                        <div style={{ flex: 1 }}>
                            <label>Stok:</label>

                            <input
                                type="number"
                                placeholder="10"
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    marginTop: '8px',
                                    backgroundColor: '#050505',
                                    color: '#fff',
                                    border: '1px solid #aaa',
                                    borderRadius: '5px',
                                    fontSize: '16px',
                                    boxSizing: 'border-box',
                                }}
                            />
                        </div>
                    </div>

                    <button
                        onClick={addProduct}
                        disabled={loading}
                        style={{
                            width: '100%',
                            marginTop: '14px',
                            padding: '13px',
                            backgroundColor: '#087df5',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '5px',
                            fontSize: '17px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                        }}
                    >
                        {loading ? 'Menyimpan...' : 'Simpan Produk'}
                    </button>
                </div>

                {/* DAFTAR PRODUK */}
                <h3
                    style={{
                        fontSize: '18px',
                        fontWeight: 'normal',
                    }}
                >
                    Daftar Produk
                </h3>

                <table
                    style={{
                        width: '100%',
                        borderCollapse: 'collapse',
                        backgroundColor: '#000',
                    }}
                >
                    <thead>
                        <tr
                            style={{
                                backgroundColor: '#eee',
                                color: '#333',
                            }}
                        >
                            <th
                                style={{
                                    padding: '12px',
                                    border: '1px solid #aaa',
                                    textAlign: 'left',
                                }}
                            >
                                Nama Produk
                            </th>

                            <th
                                style={{
                                    padding: '12px',
                                    border: '1px solid #aaa',
                                    textAlign: 'left',
                                }}
                            >
                                Harga
                            </th>

                            <th
                                style={{
                                    padding: '12px',
                                    border: '1px solid #aaa',
                                    textAlign: 'left',
                                }}
                            >
                                Stok
                            </th>

                            <th
                                style={{
                                    padding: '12px',
                                    border: '1px solid #aaa',
                                    textAlign: 'left',
                                }}
                            >
                                Aksi
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.map((item) => (
                            <tr key={item.id}>
                                <td
                                    style={{
                                        padding: '12px',
                                        border: '1px solid #aaa',
                                    }}
                                >
                                    {item.title || item.name}
                                </td>

                                <td
                                    style={{
                                        padding: '12px',
                                        border: '1px solid #aaa',
                                    }}
                                >
                                    Rp {Number(item.price).toLocaleString('id-ID')}
                                </td>

                                <td
                                    style={{
                                        padding: '12px',
                                        border: '1px solid #aaa',
                                    }}
                                >
                                    {item.stock ?? item.stok}
                                </td>

                                <td
                                    style={{
                                        padding: '12px',
                                        border: '1px solid #aaa',
                                    }}
                                >
                                    <button
                                        onClick={() => deleteProduct(item.id)}
                                        style={{
                                            backgroundColor: '#ef4444',
                                            color: '#fff',
                                            border: 'none',
                                            padding: '9px 14px',
                                            borderRadius: '5px',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        Hapus
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}