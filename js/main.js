let listSize = 1;
let listElements = [document.getElementById("el1")];
let arr = [];
const end = document.getElementById("endList");
const form = document.getElementById("listForm");
const showstep = document.getElementById("showStep");
const explanation = document.getElementById("explanation");

let steps = [];
let step_index = 0;

function addElement() {
    let el = document.createElement("input");
    let el_id = "el" + ++listSize;
    el.setAttribute("id", el_id);
    el.setAttribute("type", "text");
    el.setAttribute("placeholder", "0");
    el.setAttribute("pattern", "[\-]*[0-9]+");
    let label = document.createElement("label");
    label.htmlFor = el_id;
    label.innerText = listSize + ": ";
    let br = document.createElement("br");
    form.insertBefore(el, end);
    form.insertBefore(label, el);
    form.insertBefore(br, label);
    listElements.push(el);
    console.log("Added element " + listSize);
}

function startMergeSort() {
    try {
        arr = [];
        steps = [];
        for (let i = 0; i < listElements.length; i++) {
            arr.push(listElements[i].value|0);
        }
        let text = "We start with the unsorted list of numbers:\n\n" + arr.toString().replace(/,/g, " -> ");
        let p = document.createElement("p");
        p.innerText = text;
        steps.push(text);
        steps.push("Merge Sort is a divide and conquer algorithm, split into two steps. First we will divide the array based on the midpoint. Then we will merge and resort the elements until the entire merged list is sorted.");
        p.setAttribute("id", "info");
        let b1 = document.createElement("button");
        let b2 = document.createElement("button");
        b1.innerText = "Previous Step";
        b1.type="button";
        b1.onclick = previousStep;
        b2.innerText = "Next Step";
        b2.type="button";
        b2.onclick = nextStep;
        showstep.innerHTML = "";
        showstep.insertBefore(p, null);
        showstep.insertBefore(b1, null);
        showstep.insertBefore(b2, null);
        step_index = 0;
        mergesort(arr, 0, arr.length-1);
        text = "Merge Sort is completed with the final sorted list:\n\n";
        text += arr.toString().replace(/,/g, " -> ");
        text += "\n";
        steps.push(text)
    } catch(error) {
        showstep.innerText = error;
    }
    explanation.className="notHidden";
}

function previousStep() {
    let info = document.getElementById("info");
    step_index = Math.max(0, step_index-1);
    info.innerText = steps[step_index];
    return false;
}

function nextStep() {
    let info = document.getElementById("info");
    step_index = Math.min(steps.length-1, step_index+1);
    info.innerText = steps[step_index];
    return false;
}

function mergesort(arr, start, end) {
    if (start < end) {
        let mid = Math.floor(start + (end-start)/2);
        let x = "We split the array: " + arr.slice(start, end+1).toString() + "\n into two arrays based on the midpoint: i=" + mid + " (zero-based).";
        x += "\nThe new divided arrays are:\n";
        x += " (1) " + arr.slice(start, mid+1).toString().replace(/,/g, " -> ");
        x += "\n (2) " + arr.slice(mid+1, end+1).toString().replace(/,/g, " -> ");
        steps.push(x);
        mergesort(arr, start, mid);
        mergesort(arr, mid+1, end);
        merge(arr, start, mid, end);
    }
}

function merge(arr, start, mid, end) {
    let x = "We merge the two arrays:\n";
    x += " (1) " + arr.slice(start, mid+1).toString().replace(/,/g, " -> ");
    x += "\n (2) " + arr.slice(mid+1, end+1).toString().replace(/,/g, " -> ");

    let arr1 = [];
    let arr2 = [];
    for (let i = start; i <= mid; i++) {
        arr1.push(arr[i]);
    }
    for (let i = mid+1; i <= end; i++) {
        arr2.push(arr[i]);
    }

    let i = 0;
    let j = 0;
    let k = start;
    while (i < arr1.length && j < arr2.length) {
        x += "\n\nLooking at " + arr1[i] + " and " + arr2[j];
        if (arr1[i] > arr2[j]) {
            x += ", we see that " + arr2[j] + " is less than " + arr1[i] + ".";
            x += "\nWe add " + arr2[j] + " to the merged list next and move the pointer to compare the next element in Array (2).";
            arr[k++] = arr2[j++];
        } else {
            if (arr1[i] === arr2[j]) {
                x += ", we see that " + arr1[i] + " is equal to " + arr2[j];
            }
            else {
                x += ", we see that " + arr1[i] + " is less than " + arr2[j];
            }
            x += "\nWe add " + arr1[i] + " to the merged list next and move the pointer to compare the next element in Array (1).";
            arr[k++] = arr1[i++];
        }
    }
    if (i < arr1.length) {
        x += "\n\nThe rest of the elements are in Array (1).";
        x += " Since they are already sorted, we add them all in order to the end of the list.";
        x += "\n\n Add the remaining elements of the Array (1) to the merged list: " + arr1.slice(i, arr1.length).toString().replace(/,/g, " -> ");
    }
    if (j < arr2.length) {
        x += "\n\nThe rest of the elements are in Array (2).";
        x += " Since they are already sorted, we add them all in order to the end of the list.";
        x += "\n\n Add the remaining elements of Array (2) to the merged list: " + arr2.slice(j, arr2.length).toString().replace(/,/g, " -> ");
    }
    for (i; i < arr1.length;) arr[k++] = arr1[i++];
    for (j; j < arr2.length;) arr[k++] = arr2[j++];
    x += "\n\nThe two lists merged are " + arr.slice(start, end+1).toString().replace(/,/g, " -> ");
    x += "\nThe full array is now " + arr.toString().replace(/,/g, " -> ");
    steps.push(x);
}