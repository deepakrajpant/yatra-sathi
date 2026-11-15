import {auth} from './firebase.js';
import {onAuthStateChanged,signInWithEmailAndPassword,createUserWithEmailAndPassword,sendEmailVerification,sendPasswordResetEmail,GoogleAuthProvider,signInWithPopup,signOut,setPersistence,browserLocalPersistence,updateProfile,reload} from 'https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js';
import {get,save,cacheUser,cache,serverTimestamp} from './services/db.js';
import {fail} from './utils.js';
export const session={user:null,profile:null,role:null,access:null};
export const canAdmin=()=>session.role?.enabled&&['owner','admin','editor','support'].includes(session.role.role);
export const canEdit=()=>session.role?.enabled&&['owner','admin','editor'].includes(session.role.role);
export const canManage=()=>session.role?.enabled&&['owner','admin'].includes(session.role.role);
export async function initAuth(callback){await setPersistence(auth,browserLocalPersistence);return onAuthStateChanged(auth,async user=>{session.user=user;session.role=null;session.profile=null;session.access=null;cacheUser(user?.uid);try{if(user){const [profile,role,access]=await Promise.all([get(`users/${user.uid}`,{fresh:true}),get(`adminRoles/${user.uid}`,{fresh:true}),get(`users/${user.uid}/access/current`,{fresh:true})]);session.profile=profile;session.role=role;session.access=access;if(!profile&&navigator.onLine){const data={displayName:user.displayName||user.email.split('@')[0],email:user.email,dailyQuestionGoal:20,dailyMinutesGoal:30,targetExamId:'',preferences:{theme:'light',language:'ne'},createdAt:serverTimestamp()};await save(`users/${user.uid}`,data);session.profile=data;}}await callback();}catch(e){await callback(e);}});}
export async function login(email,password){await signInWithEmailAndPassword(auth,email,password);}
export async function signup(name,email,password){if(password.length<8)fail('Use at least 8 characters for your password.');const settings=await get('appSettings/policy');if(settings?.registrationOpen===false)fail('Registration is currently closed.');const {user}=await createUserWithEmailAndPassword(auth,email,password);await updateProfile(user,{displayName:name});await sendEmailVerification(user);}
export async function googleLogin(){await signInWithPopup(auth,new GoogleAuthProvider());}
export const resetPassword=email=>sendPasswordResetEmail(auth,email);
export const verifyEmail=()=>sendEmailVerification(auth.currentUser);
export async function refreshUser(){await reload(auth.currentUser);await auth.currentUser.getIdToken(true);session.user=auth.currentUser;}
export async function logout(){await cache.clearPrivate();await signOut(auth);cacheUser(null);location.hash='/login';}
