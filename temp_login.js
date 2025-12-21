// Script para fazer login direto no modo demo
const demoUser = {
  id: 'demo-user-' + Date.now(),
  phone: '11999999999',
  name: 'Usuário Demo',
  email: 'demo@salon.com',
};
localStorage.setItem('demo_user', JSON.stringify(demoUser));
console.log('Demo user logged in:', demoUser);
window.location.reload();
