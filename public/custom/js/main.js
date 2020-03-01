$(document).ready(() => {
    $('.category-delete').on('click', (e) => {

      $target = $(e.target)

      $.ajax({
        type: "DELETE",
        url: "/categories/delete/"+$target.attr('data-cat-id'),
        success: (response) => {

          alert('Category Removed')
          window.location.href='/'
        },
        error: (error) => {

          console.log(error)
        }
      })
    })
})

//adding a button to a series
$('.add-button').on('click', (e) => {

  $target = $(e.target)

  $field = $target.prev()

  $newField = $field.clone()

  $newField.val("")
  
  $field.parent().append($newField)
})


//removing a button from a series
$('.remove-button').on('click', (e) => {

  $target = $(e.target)

  $prev = $target.prev().prev()

  $next = $target.next()

  $next.remove()
})
