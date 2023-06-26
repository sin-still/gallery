let $container=$('.gallery'),
    $loadMoreBtn=$('.load-more'),
    $addItemCount=8,         //클릭할 때마다 보여지는 개수
    $added=0,                // 더보기 버튼이 사라지게 하는 용도
    $alldata=[];             // 배열 json파일을 불러와서 넣어놓을 공간

    $container.masonry({
        // options
        itemSelector: '.gallery-item',
        columnWidth: 270,
        gutter:20
      });


    $.getJSON('./data/content.json',function(data){
        /* console.log(data) */
        $alldata=data;

        addItem();
        $loadMoreBtn.click(addItem)
    })
    
    function addItem(){
        let element=[];
        let slicedData;

        slicedData=$alldata.slice($added,$added += $addItemCount)
        console.log(slicedData)        

        $.each(slicedData, function(idx, item){
            let itemHTML=
            `<li class="gallery-item">
                <a href="#">
                    <figure>
                        <img src="${item.images.thumb}" alt="${item.title}">
                        <figcaption>
                            ${item.title}
                        </figcaption>
                    </figure>
                </a>
            </li>`;
            element.push($(itemHTML).get(0))
        });

        $container.append(element);

        if($added<$alldata.length){
            $loadMoreBtn.show()
        }else{
            $loadMoreBtn.hide()
        }

        $container.imagesLoaded( function() {
            $container.masonry('appended', element)
          });
    }