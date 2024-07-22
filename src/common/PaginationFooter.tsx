import { Col, Pagination } from "react-bootstrap"
import { PaginationRange } from "../utils/pagintationUtils";

interface props{
    children?:any,
    totalPages:number,
    //pageSize : number,
    pageIndex:number,
    siblings : number,
    paginate:Function

}
export const PaginationFooter : React.FC<props>= ({
  
  totalPages,
  //pageSize,//para cuando se quiera cambiar el limite x pagina
  pageIndex,
  siblings,
  paginate
}) => {

  //const [pageIndex, setPageIndex] = useState<number>(1);
  
  const pagintationRange = PaginationRange(totalPages,pageIndex,siblings);

  const handlePageChange = (value: string | number) => {

    if(typeof  value === 'number')
    {
      paginate(value)
      return;
    }
    
    if(value === 'first' || value === '... ')
      paginate(1)
    if(value === 'prev')
      paginate(pageIndex - 1)
    if(value === 'next')
      paginate(pageIndex + 1)
    if(value === 'last' || value === ' ...')
      paginate(totalPages)
  }

  return (
    <Col sm={12} className="d-flex justify-content-end">
    <Pagination size="sm">
      <Pagination.First onClick={() => handlePageChange('first')}   disabled={pageIndex == 1} />
      <Pagination.Prev onClick={() => handlePageChange('prev')}  disabled={pageIndex == 1} />
     
      {
        pagintationRange.map((i)=>(
        <Pagination.Item key={i} onClick={() => handlePageChange(i)}  active={pageIndex == i}>
           {i}
        </Pagination.Item>))
      }
       
      <Pagination.Next onClick={() => handlePageChange('next')}  disabled={pageIndex == totalPages}  />      
      <Pagination.Last onClick={() => handlePageChange('last')}  disabled={pageIndex == totalPages} /> 
    </Pagination>
  </Col>  
  )
}
