import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ContatoService } from 'src/app/services/contato.service';
import { Contato } from 'src/app/models/contato.model';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-cadastro-contatos',
  templateUrl: './cadastro-contatos.component.html',
  styleUrls: ['./cadastro-contatos.component.css']
})
export class CadastroContatosComponent implements OnInit {

  mensagem: string = '';
  contato: Contato = new Contato();

  constructor(
    private contatoService: ContatoService,
    private spinnerService: NgxSpinnerService
  ) { }

  ngOnInit(): void {

  }

  formCadastro = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(150)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    telefone: new FormControl('', [Validators.required])
  });

  get form(): any {
    return this.formCadastro.controls;
  }

  onSubmit(): void {

    this.spinnerService.show();

    this.contatoService.createContato(
      this.formCadastro.value
    ).subscribe(
      res => {
        this.mensagem = "Contato cadastrado com sucesso.";
        this.contato = res;
        this.formCadastro.reset();
        this.spinnerService.hide();
      }
    )
  }

}
