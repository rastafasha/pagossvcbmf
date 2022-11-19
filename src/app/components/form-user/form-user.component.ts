import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Directorio } from '@app/models/directorio';
import { DirectorioService } from '@app/services/directorio.service';
import { MemberService } from '@app/services/member.service';
import { RoleService } from '@app/services/role.service';
import { UserService } from '@app/services/user.service';
import Swal from 'sweetalert2';
// import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';


@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.css']
})
export class FormUserComponent implements OnInit {

  @Input() directorioUser='';

  /**
   * Editor type area wyswyg
   */
  //  public Editor = ClassicEditor;
  //  public Editor1 = ClassicEditor;
  //  public editorData = `<p>This is a CKEditor 4 WYSIWYG editor instance created with Angular.</p>`;


  directorioForm: FormGroup;
  imagePath: string | null;

  directorio: Directorio;
  infoDirectorio: any;
  id: number | null;
  error: string;
  uploadError: string;
  pageTitle: string;

  public imagenSubir: File;
  public imgTemp: any = null;


  //vcard
  vCardInfo:string;
  value: string;
  display = false;
  elementType: 'url' | 'canvas' | 'img' = 'url';
  href? : string;
  vcard: string;
file: File;

constructor(
  private fb: FormBuilder,
  private userService: UserService,
  private roleService: RoleService,
  private directorioService: DirectorioService,
  private memberService: MemberService,
  private router: Router,
  private activatedRoute: ActivatedRoute,
  ) {

  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.activatedRoute.params.subscribe( ({id}) => this.iniciarFormulario(id));
  }


  iniciarFormulario(id:number){
    if (id) {
      this.pageTitle = 'Editar Directorio';
      this.directorioService.getDirectorio(+id).subscribe(
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
          });
          // this.imagePath: res.image;
          this.directorio = res;
          console.log(this.directorio);

        }
      );
    } else {
      this.pageTitle = 'Crear Directorio';
    }


    this.validarFormulario();

  }

  validarFormulario(){
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
    });
  }

  onSelectedFile(event:any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.directorioForm.get('image')?.setValue(file);
    }
  }

  guardarDirectorio() {

    this.formularioVcardGe();

    const formData = new FormData();
    formData.append('nombre', this.directorioForm.get('nombre')?.value);
    formData.append('surname', this.directorioForm.get('surname')?.value);
    formData.append('especialidad', this.directorioForm.get('especialidad')?.value);
    formData.append('universidad', this.directorioForm.get('universidad')?.value);
    formData.append('org', this.directorioForm.get('org')?.value);
    formData.append('ano', this.directorioForm.get('ano')?.value);
    formData.append('website', this.directorioForm.get('website')?.value);
    formData.append('email', this.directorioForm.get('email')?.value);
    formData.append('direccion', this.directorioForm.get('direccion')?.value);
    formData.append('direccion1', this.directorioForm.get('direccion1')?.value);
    formData.append('estado', this.directorioForm.get('estado')?.value);
    formData.append('ciudad', this.directorioForm.get('ciudad')?.value);
    formData.append('telefonos', this.directorioForm.get('telefonos')?.value);
    formData.append('tel1', this.directorioForm.get('tel1')?.value);
    formData.append('telhome', this.directorioForm.get('telhome')?.value);
    formData.append('telmovil', this.directorioForm.get('telmovil')?.value);
    formData.append('telprincipal', this.directorioForm.get('telprincipal')?.value);
    formData.append('facebook', this.directorioForm.get('facebook')?.value);
    formData.append('instagram', this.directorioForm.get('instagram')?.value);
    formData.append('twitter', this.directorioForm.get('twitter')?.value);
    formData.append('linkedin', this.directorioForm.get('linkedin')?.value);
    formData.append('image', this.directorioForm.get('image')?.value);
    formData.append('vcard', this.vCardInfo);

    const id = this.directorioForm.get('id')?.value;

    if (id) {
      this.directorioService.updateDirectorio(formData, +id).subscribe(
        res => {
          if (this.error) {
            // this.uploadError = res.message;
            Swal.fire('Error', this.uploadError, 'error');
          } else {
            // this.router.navigate(['/directorio']);
            this.infoDirectorio = res;
            Swal.fire('Guardado', 'Los cambios fueron actualizados', 'success');
          }
        },
        error => this.error = error
      );
    } else {
      this.directorioService.createDirectorio(formData).subscribe(
        res => {
          if (this.error) {
            // this.uploadError = res.message;
            Swal.fire('Error', this.uploadError, 'error');
          } else {
            this.infoDirectorio = res;
            Swal.fire('Guardado', 'Los cambios fueron creados', 'success');
            this.router.navigate(['/directorio']);
          }
        },
        error => this.error = error
      );
    }
    this.generateQRCode();

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
    box?.parentElement?.classList.add('parent')

    box?.hasAttribute('img');

    this.href = document.getElementsByClassName('parent')[0].querySelector('img')?.src;

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

/**
   * @method: Cambiar imagen profile
   * @author: malcolm
   * @since: 07/10/2022
   */

 public onReady( editor:any ) {
  editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
  );
}



}