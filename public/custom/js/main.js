$(document).ready(() => {

  //Deleting a category
  $('.category-delete').on('click', (e) => {

    $target = $(e.target)

    $.ajax({
      type: "DELETE",
      url: "/categories/delete/"+$target.attr('data-cat-id'),
      success: (response) => {

        alert('Category Removed')
        window.location.href='/manage/categories'
      },
      error: (error) => {

        console.log(error)
      }
    })
  })

  //Deleting a recipe
  $('.recipe-delete').on('click', (e) => {

    $target = $(e.target)

    $.ajax({
      type: "DELETE",
      url: "/recipes/delete/"+$target.attr('data-rec-id'),
      success: (response) => {

        alert('Recipe Removed')
        window.location.href='/manage/recipes'
      },
      error: (error) => {

        console.log(error)
      }
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
})
