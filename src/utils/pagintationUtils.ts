import _ from 'lodash';

export const PaginationRange = (totalPages:number,pageIndex:number,siblings:number) => {
  
    const totalPageNoInArray = 7 + siblings;
    if(totalPageNoInArray >= totalPages)
     return _.range(1,totalPages + 1);

    const leftSiblingsIndex = Math.max(pageIndex - siblings, 1);
    const rightSiblingsIndex = Math.min(pageIndex + siblings, totalPages);

    const showLeftDots = leftSiblingsIndex > 2;
    const showRightDots = rightSiblingsIndex < totalPages - 2;

    const itemsCount = 3+2*siblings;
    if(!showLeftDots && showRightDots){      
        const leftRange = _.range(1,itemsCount + 1);
        return [...leftRange," ...",totalPages];
    }else if (showLeftDots && !showRightDots){
        const rightRange = _.range(totalPages - itemsCount + 1 ,totalPages + 1);
        return [1,"... ",...rightRange];
    }else{ 
        const middleRange = _.range(leftSiblingsIndex,rightSiblingsIndex + 1);
        return [1,"... ",...middleRange," ...",totalPages];
    }
}

