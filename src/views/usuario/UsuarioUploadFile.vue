<template>
    <section>
        <h2>Upload File</h2>
            <form class="adicionar-file">
                <label for="file">CNAB.txt</label>
                <input type="file" id="file" name="file" ref="file">
                <input type="button" v-if="!enviando" class="btn" value="Adicionar File" @click.prevent="adicionarFile">
                <PaginaCarregandoFile v-else/>
                <ErroNotificacao :erros="erros"/>
            </form>
        <h2>Suas Movimentações</h2>
        <transition-group v-if="movimentacoes" name="list" tag="ul">
            <ul v-for="(movimentacao, index) in movimentacoes" :key="index">
                <br>
                <p><b> Dono: {{movimentacao.nome}}</b></p>
                <li v-for="(loja, i) in movimentacao.lojas" :key="i">
                    <br v-if="i > 0">
                    <p><b>Loja: {{loja.nome_loja}}</b></p>
                    <br>
                    <table>
                    <tr>
                        <th align='center'>Tipo</th>
                        <th align='center'>Data</th>
                        <th align='center'>Valor</th>
                        <th align='center'>Cpf</th>
                        <th align='center'>Cartão</th>
                        <th align='center'>Hora</th>
                    </tr>
                    <tr v-for="(moviment, ind) in loja.movimentacoes" :key="ind">
                        <td>{{moviment.tipo}}</td>
                        <td>{{moviment.data}}</td>
                        <td>{{moviment.valor}}</td>
                        <td>{{moviment.cpf}}</td>
                        <td>{{moviment.cartao}}</td>
                        <td>{{moviment.hora}}</td>
                    </tr>
                </table>
                </li>
            </ul>
        </transition-group>
    </section>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import {api} from "@/services.js"
export default {
    name: "UsuarioUploadFile",
    data() {
        return {
            enviando: false,
            file : "",
            erros: []
        }
    },
    
    computed: {
        ...mapState(["login", "usuario", "movimentacoes"])
    },
    methods: {
      ...mapActions(["getMovimentacoes"]),
      
      adicionarFile(){
        this.enviando = true;
        const form = new FormData();
        const file = this.$refs.file.files[0];
        form.append('file', file);
        api.post("/store-file", form).then(() => {
            alert("Arquivo carregado com sucesso!");
            this.enviando = false;
            this.getMovimentacoes();
        }).catch((error) => {
            alert(error.response.data.message);
            this.enviando = false;
        });
      }
    },
    created(){
        this.getMovimentacoes();
    }
    
}
</script>

<style>
table{
    width: 100%;
    
}
tr{
        width: 100%;
}
th,td{
    box-sizing:border-box;
    padding: 20px;
}

    th{
      background: #87f;
      color: #fff;
      text-align: left;
    }
  
.adicionar-file {
    display: grid;
    grid-template-columns: 100px 1fr;
    align-items: center;
    margin-bottom: 60px;
}

.btn{
    grid-column: 2;
}

.list-enter,
.list-leave-to {
    opacity: 0;
    transform: translate3d(20px, 0, 0);
}

.list-enter-active,
.list-leave-active {
    transition: all .3s;
}

</style>
