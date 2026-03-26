// src/app/testing/test-helpers.ts
// Utilitaires pour simplifier l'écriture des tests

import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

/**
 * Trouve un élément par sélecteur CSS
 */
export function querySelector<T>(
  fixture: ComponentFixture<T>,
  selector: string
): DebugElement | null {
  return fixture.debugElement.query(By.css(selector));
}

/**
 * Trouve tous les éléments par sélecteur CSS
 */
export function querySelectorAll<T>(
  fixture: ComponentFixture<T>,
  selector: string
): DebugElement[] {
  return fixture.debugElement.queryAll(By.css(selector));
}

/**
 * Obtient le texte d'un élément
 */
export function getElementText<T>(
  fixture: ComponentFixture<T>,
  selector: string
): string {
  const element = querySelector(fixture, selector);
  return element ? element.nativeElement.textContent.trim() : '';
}

/**
 * Simule un clic sur un élément
 */
export function clickElement<T>(
  fixture: ComponentFixture<T>,
  selector: string
): void {
  const element = querySelector(fixture, selector);
  if (element) {
    element.nativeElement.click();
    fixture.detectChanges();
  }
}

/**
 * Tape du texte dans un input
 */
export function typeInInput<T>(
  fixture: ComponentFixture<T>,
  selector: string,
  text: string
): void {
  const element = querySelector(fixture, selector);
  if (element) {
    element.nativeElement.value = text;
    element.nativeElement.dispatchEvent(new Event('input'));
    element.nativeElement.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
  }
}

/**
 * Crée un spy sur une méthode de service
 */
export function createServiceSpy<T>(
  service: T,
  method: keyof T
): jasmine.Spy {
  return spyOn(service, method as any);
}

/**
 * Crée un mock complet d'un service
 */
export function createServiceMock<T>(
  service: T,
  methods: (keyof T)[]
): T {
  const mock: any = {};
  methods.forEach((method) => {
    mock[method] = jasmine.createSpy(String(method));
  });
  return mock;
}
