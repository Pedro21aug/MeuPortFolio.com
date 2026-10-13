export interface LegalSection {
  title: string;
  paragraphs: string[];
}

export interface LegalDocument {
  slug: "termos" | "privacidade" | "lgpd";
  title: string;
  intro: string;
  updatedAt: string;
  sections: LegalSection[];
}

const UPDATED_AT = "11 de outubro de 2026";

export const LEGAL_DOCUMENTS: Record<LegalDocument["slug"], LegalDocument> = {
  termos: {
    slug: "termos",
    title: "Termos de uso",
    intro:
      "Estes termos explicam as regras para usar o MeuPortfólio.com, tanto como contratante quanto como profissional autônomo. Ao criar uma conta, você concorda com o que está descrito aqui.",
    updatedAt: UPDATED_AT,
    sections: [
      {
        title: "Aceitação",
        paragraphs: [
          "Ao acessar ou criar uma conta no MeuPortfólio.com, você confirma que leu, entendeu e aceita estes termos. Se não concordar com algum ponto, não utilize a plataforma.",
          "Estes termos podem ser atualizados para refletir mudanças no produto ou na legislação. A versão vigente é sempre a publicada nesta página.",
        ],
      },
      {
        title: "Cadastro e conta",
        paragraphs: [
          "Você é responsável pela veracidade das informações informadas no cadastro, como nome, contatos, CPF ou CNPJ, estado e cidade. Dados incorretos podem impedir que contratantes encontrem o seu perfil ou que você encontre profissionais.",
          "A conta é pessoal: mantenha sua senha em sigilo e não compartilhe o acesso. O uso da conta por terceiros é de responsabilidade do titular.",
          "É necessário ser maior de 18 anos e ter capacidade legal para contratar serviços ou oferecer trabalho autônomo.",
        ],
      },
      {
        title: "Relação entre contratantes e profissionais",
        paragraphs: [
          "O MeuPortfólio.com é uma plataforma de conexão. Não somos empregadores, não somos parte do acordo firmado entre contratante e profissional e não prestamos os serviços anunciados.",
          "Toda negociação entre as partes — escopo, prazo, valores e demais condições — acontece diretamente entre contratante e profissional, sem qualquer interferência da plataforma.",
          "Cada profissional é responsável por suas obrigações fiscais, tributárias e previdenciárias decorrentes do trabalho autônomo.",
        ],
      },
      {
        title: "Portfólios e conteúdos publicados",
        paragraphs: [
          "Você é responsável por todo conteúdo que publica: descrições, atividades, links, imagens e demais informações. Envie apenas materiais próprios ou para os quais tenha autorização de uso.",
          "É proibido publicar conteúdo ilegal, ofensivo, enganoso, que viole direitos de terceiros ou que apresente serviços que você não presta.",
          "Podemos remover conteúdos que contrariem estes termos e comunicar o titular da conta.",
        ],
      },
      {
        title: "Negociação fora da plataforma",
        paragraphs: [
          "O MeuPortfólio.com não intermedeia a negociação entre contratante e profissional e não realiza nem participa de pagamentos. Não há qualquer cobrança, retenção ou repasse de valores pela plataforma.",
          "O que for combinado entre as partes é responsabilidade exclusiva delas. Não nos responsabilizamos por atrasos ou descumprimento do que foi acertado diretamente entre os usuários.",
        ],
      },
      {
        title: "Condutas proibidas",
        paragraphs: [
          "Não é permitido usar a plataforma para fraude, spam, assédio, discriminação, acesso indevido a contas de terceiros ou qualquer atividade ilícita.",
          "Também não é permitido tentar burlar limites técnicos, automatizar acessos sem autorização ou explorar falhas da plataforma.",
        ],
      },
      {
        title: "Suspensão e encerramento",
        paragraphs: [
          "Podemos suspender ou encerrar uma conta em caso de violação destes termos, uso indevido ou determinação legal, com aviso ao titular sempre que possível.",
          "Você pode encerrar sua conta a qualquer momento pela opção Sair e pelos canais de contato, respeitando compromissos já assumidos com outros usuários.",
        ],
      },
      {
        title: "Contato",
        paragraphs: [
          "Dúvidas sobre estes termos podem ser enviadas pelos canais da página de Contato. Responderemos no prazo indicado lá.",
        ],
      },
    ],
  },
  privacidade: {
    slug: "privacidade",
    title: "Política de privacidade",
    intro:
      "Esta política descreve quais dados o MeuPortfólio.com coleta, para que eles são usados e como você pode exercer seus direitos. Ela deve ser lida junto com a página de LGPD.",
    updatedAt: UPDATED_AT,
    sections: [
      {
        title: "Dados que coletamos",
        paragraphs: [
          "Dados de cadastro: nome, e-mail, telefone, CPF ou CNPJ, estado e cidade. No caso de contratantes, também a razão social, quando informada.",
          "Dados de uso: informações de navegação, páginas visitadas, dispositivo e endereço IP, usados para segurança e melhoria do produto.",
          "Conteúdo publicado: portfólios, atividades, descrições, links e imagens que você envia para a plataforma.",
        ],
      },
      {
        title: "Como usamos os dados",
        paragraphs: [
          "Para criar e manter sua conta, autenticar o acesso, exibir seu perfil para contratantes e permitir o contato entre as partes.",
          "Para enviar comunicações necessárias, como confirmação de cadastro, recuperação de senha e avisos sobre a sua conta.",
          "Para prevenir fraudes, cumprir obrigações legais e medir o desempenho da plataforma de forma agregada.",
        ],
      },
      {
        title: "Compartilhamento",
        paragraphs: [
          "Não vendemos seus dados. Compartilhamos apenas o necessário com provedores de infraestrutura, armazenamento e envio de e-mail, sempre com obrigações de confidencialidade.",
          "Dados do profissional que você decide publicar (como nome, cidade, atividades e portfólio) ficam visíveis para contratantes na plataforma.",
          "Também podemos compartilhar informações quando houver determinação judicial ou obrigação legal.",
        ],
      },
      {
        title: "Cookies e medição",
        paragraphs: [
          "Usamos cookies e tecnologias semelhantes para manter a sessão, lembrar preferências e medir o uso das páginas.",
          "Você pode gerenciar cookies no seu navegador. Bloquear cookies essenciais pode impedir o funcionamento do login e de outras áreas.",
        ],
      },
      {
        title: "Segurança e retenção",
        paragraphs: [
          "Adotamos medidas técnicas e administrativas para proteger os dados, incluindo criptografia em trânsito e controle de acesso.",
          "Mantemos os dados pelo tempo necessário para as finalidades descritas e para cumprir prazos legais. Depois disso, são eliminados ou anonimizados.",
        ],
      },
      {
        title: "Seus direitos",
        paragraphs: [
          "Você pode solicitar confirmação de tratamento, acesso, correção, anonimização, portabilidade e eliminação dos seus dados, conforme a LGPD.",
          "Para exercer esses direitos, use os canais da página de Contato. Veja detalhes na página de LGPD.",
        ],
      },
    ],
  },
  lgpd: {
    slug: "lgpd",
    title: "LGPD",
    intro:
      "A Lei Geral de Proteção de Dados (Lei nº 13.709/2018) define como dados pessoais podem ser tratados no Brasil. Esta página resume como aplicamos a lei no MeuPortfólio.com.",
    updatedAt: UPDATED_AT,
    sections: [
      {
        title: "Papéis no tratamento",
        paragraphs: [
          "O MeuPortfólio.com atua como controlador dos dados pessoais coletados no cadastro e no uso da plataforma.",
          "Você, titular dos dados, pode decidir sobre as informações que publica e exercer os direitos previstos na lei.",
        ],
      },
      {
        title: "Bases legais",
        paragraphs: [
          "Execução do contrato de uso da plataforma: dados necessários para criar sua conta, autenticar o acesso e viabilizar o contato entre contratantes e profissionais.",
          "Cumprimento de obrigação legal: guarda de registros e atendimento a autoridades competentes.",
          "Legítimo interesse: segurança, prevenção a fraudes e melhoria do produto, sempre com respeito aos seus direitos.",
          "Consentimento: quando aplicável, como em comunicações opcionais. Você pode revogar o consentimento a qualquer momento.",
        ],
      },
      {
        title: "Dados sensíveis",
        paragraphs: [
          "Não solicitamos dados pessoais sensíveis, como informações de saúde, biometria ou convicção religiosa. Pedimos que você não os inclua em descrições ou imagens de portfólio.",
        ],
      },
      {
        title: "Como exercer seus direitos",
        paragraphs: [
          "Envie seu pedido pelos canais da página de Contato, informando o e-mail cadastrado e o direito que deseja exercer: confirmação, acesso, correção, anonimização, portabilidade ou eliminação.",
          "Podemos solicitar informações adicionais para confirmar a sua identidade e evitar acessos indevidos.",
        ],
      },
      {
        title: "Prazos e resposta",
        paragraphs: [
          "Respondemos aos pedidos em prazo compatível com a legislação e com a complexidade da solicitação. Quando não for possível atender de imediato, explicamos o motivo.",
        ],
      },
      {
        title: "Encarregado (DPO)",
        paragraphs: [
          "Nosso encarregado pelo tratamento de dados é acionado pelos canais de Contato, com o assunto “LGPD”.",
          "Também é possível apresentar reclamação à Autoridade Nacional de Proteção de Dados (ANPD).",
        ],
      },
    ],
  },
};
