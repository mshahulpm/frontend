import { useParams } from "react-router-dom"
import { Card, Chip, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { Link } from "react-router-dom";
import { getOneCategory, getProductsByCategory } from "src/service/api/get";



function Main({ id }: { id: string }) {

    const { data: category } = useQuery(['category_details'], getOneCategory(id!))
    const { data: products } = useQuery(['category_products'], getProductsByCategory(id!))

    return (
        <div>
            <Card sx={{ p: 2, m: 'auto', mt: 3, maxWidth: '400px' }}>
                <Typography variant='h6'>{category?.category?.name} </Typography>
                {
                    category?.children?.map((cat: any) => (
                        <a
                            style={{
                                color: 'white',
                                textDecoration: 'none',
                            }}
                            href={`/category/${cat._id}`} key={cat._id}>
                            <Chip sx={{ m: 1, cursor: 'pointer' }} label={cat.name} color='info' />
                        </a>
                    ))
                }
            </Card>
            <Card sx={{ mx: 'auto', mt: 2, p: 2, maxWidth: '400px' }}>
                <Typography variant='h6'>Products ({products?.count})</Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ProductName</TableCell>
                            <TableCell>Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            products?.products?.map((prod: any) => (
                                <TableRow key={prod._id}>
                                    <TableCell>{prod.name}</TableCell>
                                    <TableCell>{prod.price}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>

            </Card>
        </div>
    )
}


export default function CategoryDetails() {
    const { id } = useParams()

    return <Main id={id!} />
}
