import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DirectorioService } from '../../../services/directorio.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
// import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { Location } from '@angular/common';
import { Directorio } from 'src/app/models/directorio';
import Swal from 'sweetalert2';
import { UserService } from '../../../services/user.service';
import { User } from '@app/models/user';

@Component({
  selector: 'app-directorio-edit',
  templateUrl: './directorio-edit.component.html',
  styleUrls: ['./directorio-edit.component.css']
})
export class DirectorioEditComponent implements OnInit {


  /**
   * Editor type area wyswyg
   */
  // public Editor = DecoupledEditor;
  // public Editor1 = DecoupledEditor;
  // public editorData = `<p>This is a CKEditor 4 WYSIWYG editor instance created with Angular.</p>`;

  /**
   * Formulario que contiene los filtros de busqueda de las personas
   */

  directorioForm: FormGroup;
  imagePath: string;

  public infoDirectorio: Directorio;

  /**
   * propiedad encargada de definir si se muestran los mensajes de validacion formulario de usuario
   * @property {boolean} mostrarMensajesVU
   */
  public mostrarMensajesVU = false;

  /**
   * mensaje cuando es un campo obligatorio
   * @property {string}
   */
   public static campoObligatorio: string = 'El Campo es requerido';


  error: string;
  uploadError: boolean;


  pageTitle: string;

  public imagenSubir: File;
  public imgTemp: any = null;

  /**
   * Propiedad del codigoQR
   */
  public directory: Directorio;
  directories: Directorio;
  id: string | null;

  vCardInfo:string;
  value: string;
  display = false;
  elementType: 'url' | 'canvas' | 'img' = 'url';
  href : string;
  vcard: string;

  public user:User;

  imagen:string;


  constructor(
    private fb: FormBuilder,
    private directorioService: DirectorioService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private location: Location,
    private cd: ChangeDetectorRef
  ) {
this.user = this.userService.user;
  }




  ngOnInit() {
    // this.iniciarFormulario();
    window.scrollTo(0, 0);
    this.activatedRoute.params.subscribe( ({id}) => this.iniciarFormularioDirectorio(id));
    // this.openToast();


  }

  openToast(){
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      // didOpen: (toast) => {
      //   toast.addEventListener('mouseenter', Swal.stopTimer)
      //   toast.addEventListener('mouseleave', Swal.resumeTimer)
      // }
    })

    Toast.fire({
      icon: 'success',
      title: 'Signed in successfully'
    })
  }

  /**
   * @method: Permite iniciar formulario y obtener la info del id
   * @author: malcolm
   * @since: 27/06/2022
   */



  iniciarFormularioDirectorio(id:number){
    // const id = this.route.snapshot.paramMap.get('id');
    if (!id == null || !id == undefined || id) {
      // let id = this.directory.id;
      this.pageTitle = 'Editar Directorio';
      this.directorioService.getDirectorio(id).subscribe(
        res => {
          this.directorioForm.patchValue({
            id: res.id,
            nombre: res.nombre,
            surname: res.surname,
            especialidad: res.especialidad,
            org: res.org,
            universidad: res.universidad,
            ano: res.ano,
            website: res.website,
            email: res.email,
            direccion: res.direccion,
            direccion1: res.direccion1,
            estado: res.estado,
            ciudad: res.ciudad,
            telefonos: res.telefonos,
            tel1: res.tel1,
            telhome: res.telhome,
            telmovil: res.telmovil,
            telprincipal: res.telprincipal,
            facebook: res.facebook,
            instagram: res.instagram,
            twitter: res.twitter,
            linkedin: res.linkedin,
            vcard: this.vCardInfo,
            user_id: res.user_id,
            status: res.status,
            // image : res.image
          });
          this.imagePath = res.image;
          this.directory = res;

        }
      );
    } else {
      this.pageTitle = 'Crear Directorio';
    }

    this.directorioForm = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
      surname: ['', Validators.required],
      especialidad: ['', Validators.required],
      universidad: ['', Validators.required],
      ano: [''],
      org: ['SVCBMF'],
      website: [''],
      email: ['', Validators.required],
      direccion: ['', Validators.required],
      direccion1: [''],
      estado: [''],
      ciudad: [''],
      telefonos: [''],
      tel1: [''],
      telhome: [''],
      telmovil: [''],
      telprincipal: ['', Validators.required],
      facebook: [''],
      instagram: [''],
      twitter: [''],
      linkedin: [''],
      vcard: [this.vCardInfo],
      image: [''],
      user_id: [''],
      status: [''],
    });


  }

  onSelectedFile(event) {debugger
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.directorioForm.get('image').setValue(file.name);

      this.imagen = file.name;
    }
    // const reader = new FileReader();

    // if(event.target.files && event.target.files.length) {
    //   const [file] = event.target.files;
    //   reader.readAsDataURL(file);

    //   reader.onload = () => {
    //     this.directorioForm.patchValue({
    //       file: reader.result
    //    });

    //     // need to run CD since file load runs outside of zone
    //     this.cd.markForCheck();
    //   };
    // }
  }

  get nombre() { return this.directorioForm.get('nombre'); }
  get surname() { return this.directorioForm.get('surname'); }
  get especialidad() { return this.directorioForm.get('especialidad'); }
  get universidad() { return this.directorioForm.get('universidad'); }
  get org() { return this.directorioForm.get('org'); }
  get ano() { return this.directorioForm.get('ano'); }
  get website() { return this.directorioForm.get('website'); }
  get email() { return this.directorioForm.get('email'); }
  get direccion() { return this.directorioForm.get('direccion'); }
  get direccion1() { return this.directorioForm.get('direccion1'); }
  get estado() { return this.directorioForm.get('estado'); }
  get ciudad() { return this.directorioForm.get('ciudad'); }
  get telefonos() { return this.directorioForm.get('telefonos'); }
  get tel1() { return this.directorioForm.get('tel1'); }
  get telhome() { return this.directorioForm.get('telhome'); }
  get telmovil() { return this.directorioForm.get('telmovil'); }
  get telprincipal() { return this.directorioForm.get('telprincipal'); }
  get facebook() { return this.directorioForm.get('facebook'); }
  get instagram() { return this.directorioForm.get('instagram'); }
  get twitter() { return this.directorioForm.get('twitter'); }
  get linkedin() { return this.directorioForm.get('linkedin'); }
  get user_id() { return this.directorioForm.get('user_id'); }


  guardarDirectorio() {debugger

    this.formularioVcardGe();

    const formData = new FormData();
    formData.append('nombre', this.directorioForm.get('nombre').value);
    formData.append('surname', this.directorioForm.get('surname').value);
    formData.append('especialidad', this.directorioForm.get('especialidad').value);
    formData.append('universidad', this.directorioForm.get('universidad').value);
    formData.append('org', this.directorioForm.get('org').value);
    formData.append('ano', this.directorioForm.get('ano').value);
    formData.append('website', this.directorioForm.get('website').value);
    formData.append('email', this.directorioForm.get('email').value);
    formData.append('direccion', this.directorioForm.get('direccion').value);
    formData.append('direccion1', this.directorioForm.get('direccion1').value);
    formData.append('estado', this.directorioForm.get('estado').value);
    formData.append('ciudad', this.directorioForm.get('ciudad').value);
    formData.append('telefonos', this.directorioForm.get('telefonos').value);
    formData.append('tel1', this.directorioForm.get('tel1').value);
    formData.append('telhome', this.directorioForm.get('telhome').value);
    formData.append('telmovil', this.directorioForm.get('telmovil').value);
    formData.append('telprincipal', this.directorioForm.get('telprincipal').value);
    formData.append('facebook', this.directorioForm.get('facebook').value);
    formData.append('instagram', this.directorioForm.get('instagram').value);
    formData.append('twitter', this.directorioForm.get('twitter').value);
    formData.append('linkedin', this.directorioForm.get('linkedin').value);
    formData.append('user_id', this.directorioForm.get('user_id').value);
    formData.append('status', this.directorioForm.get('status').value);
    formData.append('image', this.directorioForm.get('image').value);
    formData.append('vcard', this.vCardInfo);

    const id = this.directorioForm.get('id').value;

    if (id) {
      const data = {
        ...this.directorioForm.value,
        vcard: this.vCardInfo,
        id: this.directory.id
      }
      this.directorioService.updateDirectorio(data).subscribe(
        res => {
          if (this.error) {
            // this.uploadError = res.message;
            // Swal.fire('Error', this.uploadError, 'error');
          } else {
            // this.router.navigate(['/directorio']);
            // this.infoDirectorio = res;
            Swal.fire('Guardado', 'Los cambios fueron actualizados', 'success');
          }
        },
        error => this.error = error
      );
    } else {
      const data = {
        ...this.directorioForm.value
      }
      this.directorioService.createDirectorio(data).subscribe(
        res => {
          if (res === 'error') {
            // this.uploadError = res;
            // Swal.fire('Error', this.uploadError, 'error');
          } else {
            // this.infoDirectorio = res;
            Swal.fire('Guardado', 'Los cambios fueron creados', 'success');
            this.router.navigate(['/dashboard/directorio']);
          }
        },
        error => this.error = error
      );
    }
    this.generateQRCode();

  }


  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }


  public onReady( editor ) {
    editor.ui.getEditableElement().parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
    );
  }
/**
   * @method: Permite crear el qr
   * @author: malcolm
   * @since: 11/07/2022
   */



 formularioVcardGe(){


  let {nombre, surname , org , website , facebook, instagram,
    linkedin , twitter , email , image , especialidad , direccion, direccion1,
    tel1 , telhome , telmovil , telprincipal} = this.directorioForm.getRawValue();

    this.vCardInfo = `BEGIN:VCARD
VERSION:3.0
N:${surname};${nombre}
FN:${surname} ${nombre}
ORG:${org}
URL:${website}
URL:${facebook}
URL:${instagram}
URL:${linkedin}
URL:${twitter}
EMAIL:${email}
PHOTO:${image}
TITLE:${especialidad}
ADR;TYPE=work:${direccion}
ADR;TYPE=home:${direccion1}
TEL;TYPE=voice,work,oref:${tel1}
TEL;TYPE=voice,home,oref:${telhome}
TEL;TYPE=voice,mobile,oref:${telmovil}
TEL;TYPE=voice,first,oref:${telprincipal}
END:VCARD
    `
    // console.log(this.vCardInfo);
}
  /**
   * @method: Descarga la imagen del qr
   * @author: malcolm
   * @since: 11/07/2022
   */

  downloadImage(){

    const box = document.getElementById('box');
    box.parentElement.classList.add('parent')

    box.hasAttribute('img');

    this.href = document.getElementsByClassName('parent')[0].querySelector('img').src;

    // console.log('img', this.href);
  }

  /**
 * @method: Genera la imagen del qr
 * @author: malcolm
 * @since: 11/07/2022
 */

generateQRCode(){
  if( this.directorioForm.valid){
    this.display = true;
    // alert("Please enter the name");
  }
  return false;

}

hideQRCode(){
  if( this.directorioForm.valid){
    this.display = false;
    // alert("Please enter the name");
  }
  return false;

}

}
