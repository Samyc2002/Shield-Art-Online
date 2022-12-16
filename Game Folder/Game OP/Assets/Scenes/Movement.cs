using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Movement : MonoBehaviour
{
    public Rigidbody rw;
    // Start is called before the first frame update
    void Start()
    {
        Debug.Log("Hello World!");
        rw.AddForce(0,200,500);
    }

    // Update is called once per frame
    void Update()
    {
        rw.AddForce(0,0,200*Time.deltaTime);
    }
}
