// Objeto Construtor de Contatos
class Contato{
    constructor(setor, nome, ramal){
        this.setor = setor,
        this.nome = nome,
        this.ramal = ramal
    }
}


// Class LocalStorage

class Storage{
   static getContatos(){
       let contatos
       if(localStorage.getItem('file') === null ){
        contatos = []
       }
       else{
           contatos = JSON.parse(localStorage.getItem('file'))
       }
       return contatos
   }
   static addContatos(contato){
       const contatos = Storage.getContatos()
       contatos.push(contato)
       localStorage.setItem('file',JSON.stringify(contatos))
   }
   static deleteContato(ramal){     
     const contatos = Storage.getContatos()
     contatos.forEach((contato,index)=>{
         if(contato.ramal == ramal){
             contatos.splice(index,1)
         }
     }) 
         localStorage.setItem('file', JSON.stringify(contatos))
         window.location.reload()
     }     
   }


// Class Usuario Interface

class UI{
    static addContactList(contatos){

        const tbody = document.querySelector('tbody')
        const row = document.createElement('tr')
        row.innerHTML = 
        `<td>${contatos.setor}</td>
         <td>${contatos.nome}</td>
         <td>${contatos.ramal}</td>
         <td><a  onclick="Storage.deleteContato(${contatos.ramal})" class="btn-floating red lighten-1 waves-effect waves-light"><i class="material-icons white-text">delete_forever</i></a></td>        
        `
        tbody.appendChild(row)
    }

    static displayContactList(){
        const contatos = Storage.getContatos()
        contatos.forEach((contato)=>{UI.addContactList(contato)})
    }

    static limpaCampos(){
        document.querySelector("#setor").value = ''
        document.querySelector("#nome").value = ''
        document.querySelector("#ramal").value = ''
        window.location.reload()
    }

    static menssagem(message, classname){

        const formulario = document.querySelector('#formulario')
        const container = document.querySelector('#container')
        const div = document.createElement('div')
        div.className = `white-text ${classname}`
        div.appendChild(document.createTextNode(message))
        container.appendChild(div)
    }

    static filtro(){
        const input = document.querySelector("#search").value.toUpperCase()
        const table = document.querySelector('table')
        const  tr = table.getElementsByTagName('tr')
        let td,txtValue        

        for( let i = 0; i < tr.length; i++){
            td = tr[i].getElementsByTagName('td')[1]
            if(td){
                txtValue = td.textContent || td.innerText
                if(txtValue.toUpperCase().indexOf(input) > -1){
                    tr[i].style.display = ''                    
                }
                else{
                    tr[i].style.display = 'none'
                }
            }
        }
    }
}



// Mostar Lista de Contatos ao carregar a Página

document.addEventListener('DOMContentLoaded', UI.displayContactList)

// Mostrar resultado da busca
document.querySelector("#search").addEventListener('keyup', UI.filtro)

// Adicionar um contato
document.querySelector('.btn-floating').addEventListener('click',(e)=>{
 //  console.log('funcionando')
   e.preventDefault()
   const setor = document.querySelector('#setor').value.toUpperCase()
   const nome = document.querySelector('#nome').value.toUpperCase()
   const ramal = document.querySelector('#ramal').value
   
   if(setor === '' || nome === '' || ramal === '' || isNaN(ramal)){
       alert("Preencha corretamente todos os campos")
       UI.limpaCampos()
   }
   else{
       const contato = new Contato(setor, nome, ramal)
       
       //Adicionar  contato a lista
       UI.addContactList(contato)

       // Mensagem de Sucesso

       // UI.menssagem('Contato Adicionado','green')

       // Adicionar contato ao localStorage
       Storage.addContatos(contato)

       // Limpando Campos 
       UI.limpaCampos()
   }
})

