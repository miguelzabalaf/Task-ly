import Swal from 'sweetalert2';
import axios from 'axios';

const buttonDelete = document.querySelector('#button-delete');

if (buttonDelete) {
  buttonDelete.addEventListener('click', (e) => {

    const urlProject = e.target.dataset.projectUrl;
    // console.log(urlProjct);
    // return
    console.log('Click in delete');
    Swal.fire({
      title: 'Do you want to delete this project?',
      text: "There will be no way to get it back",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#228DE5',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete'
    }).then((result) => {
      if (result.isConfirmed) {

        // Send Axios petition
        const url = `${location.origin}/projects/${urlProject}`;
        // console.log(url);
        axios.delete(url, { params: { urlProject } })
          .then((resp) => {
            console.log(resp)

            Swal.fire(
              'Deleted!',
              resp.data,
              'success'
            );
            // Redirec to Home
            setTimeout(() => {
              window.location.href = "/"
            }, 3000)
          })
          .catch(() => {
            Swal.fire({
              type: 'error',
              title: 'Error',
              text: 'Could not delete this project'
            })
          })



      }
    })
  })
}

export default buttonDelete;